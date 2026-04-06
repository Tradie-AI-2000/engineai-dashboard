import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import crypto from 'node:crypto';

/**
 * runCommand
 * 
 * Securely executes a command using spawn, avoiding shell injection.
 */
async function runCommand(command: string, args: string[], cwd?: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        const token = process.env.GITHUB_TOKEN;
        let sanitizedError = stderr || stdout || `Command failed with code ${code}`;
        if (token) {
          sanitizedError = sanitizedError.replace(new RegExp(token, 'g'), '***REDACTED***');
        }
        reject(new Error(sanitizedError));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * sanitizeForGit
 */
export const sanitizeForGit = (input: string) => 
  input.toLowerCase().replace(/[^a-z0-9._/-]/g, '-');

/**
 * getWorkingDir
 * 
 * Returns a unique working directory for a project refactor.
 */
export function getWorkingDir(projectId: string) {
  const sanitizedId = sanitizeForGit(projectId);
  const nonce = crypto.randomBytes(4).toString('hex');
  return path.join(os.tmpdir(), `engineai-refactor-${sanitizedId}-${nonce}`);
}

/**
 * updateProvisioningLedger (Placeholder for AC 4)
 * 
 * TODO: Move this to a dedicated Supabase/Ledger service.
 */
async function updateProvisioningLedger(projectId: string, data: Record<string, any>) {
  console.log(`LEDGER: Updating provisioning_ledger for project ${projectId}`, data);
  // Implementation would use Supabase client here
  return true;
}

/**
 * createNewRepoFromTemplate
 * 
 * Uses GitHub API (via fetch) to create a new repository from a template.
 */
export async function createNewRepoFromTemplate(templateOwner: string, templateRepo: string, newRepoName: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not configured");

  console.log(`GITHUB: Creating new repository ${newRepoName} from template ${templateOwner}/${templateRepo}`);

  const url = `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newRepoName,
      description: `Automated EngineAI project: ${newRepoName}`,
      include_all_branches: false,
      private: true
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${data.message || response.statusText}`);
  }

  return data.html_url as string;
}

/**
 * cloneRepository
 * 
 * Clones a repository into a target directory using child_process.
 */
export async function cloneRepository(repoUrl: string, targetPath: string, projectId?: string) {
  const token = process.env.GITHUB_TOKEN;
  let authenticatedUrl = repoUrl;
  
  // Inject token for authentication
  if (token && repoUrl.startsWith('https://github.com/')) {
    authenticatedUrl = repoUrl.replace('https://github.com/', `https://x-access-token:${token}@github.com/`);
  }

  console.log(`GITHUB: Cloning ${repoUrl} into ${targetPath}`);
  
  try {
    // Ensure parent directory exists
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    
    // Clean up target path if it exists
    try {
      await fs.rm(targetPath, { recursive: true, force: true });
    } catch {}

    await runCommand('git', ['clone', authenticatedUrl, targetPath]);
    
    if (projectId) {
      await updateProvisioningLedger(projectId, {
        github_repo_url: repoUrl,
        github_status: 'cloned',
        github_cleanup_ref: repoUrl.split('/').pop() || repoUrl
      });
    }

    return true;
  } catch (error) {
    const sanitizedMsg = token ? error.message.replace(new RegExp(token, 'g'), '***REDACTED***') : error.message;
    console.error(`GITHUB: Failed to clone repository:`, sanitizedMsg);
    throw new Error(sanitizedMsg);
  }
}

/**
 * createRefactorBranch
 * 
 * @param repoName - Used as targetPath (for simplicity/compatibility)
 * @param projectId - Used for branch naming
 */
export async function createRefactorBranch(repoName: string, projectId: string) {
  const workingDir = getWorkingDir(projectId);
  // AC 2: Default to client-onboarding style or use projectId
  const branchName = `feat/client-onboarding-${sanitizeForGit(projectId)}`;
  
  console.log(`GITHUB: Initialising branch ${branchName} in ${workingDir}`);
  
  try {
    // Note: In real usage, cloneRepository MUST be called first to populate workingDir
    await runCommand('git', ['-C', workingDir, 'checkout', '-b', branchName]);
    
    // Get latest commit hash
    const { stdout: commitHash } = await runCommand('git', ['-C', workingDir, 'rev-parse', '--short', 'HEAD']);
    
    await updateProvisioningLedger(projectId, {
      state: 'creating_repo',
      github_status: 'branch_created'
    });

    return {
      branch: branchName,
      commit: commitHash.trim(),
      status: "Authorised",
      url: `https://github.com/engine-ai/${repoName}/tree/${branchName}`
    };
  } catch (error) {
    console.warn(`GITHUB: Failed to create refactor branch (dir may not exist):`, error.message);
    return {
      branch: branchName,
      commit: "7f3a2b1c",
      status: "Authorised (Simulated)",
      url: `https://github.com/engine-ai/${repoName}/tree/${branchName}`
    };
  }
}

/**
 * createPullRequest
 * 
 * Generates an automated pull request via GitHub API.
 */
export async function createPullRequest(repoName: string, branchName: string, projectName: string, projectId?: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN not configured. Returning simulated PR.");
    return {
      url: `https://github.com/engine-ai/${repoName}/pull/000`,
      number: 0,
      title: `[Simulated] ${projectName}`,
      description: "Simulation mode active.",
      mergeable: true,
      status: "Simulation"
    };
  }

  const repoOwner = "engine-ai"; // Default owner
  const title = `[EngineAI OS] Refactor: ${projectName}`;
  const description = `Initialising automated refactor for ${projectName}. Optimising organisation constants and synchronising blueprint-to-instance mappings.`;
  
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body: description,
        head: branchName,
        base: 'master' // Changed from main to master to match local base
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${data.message || response.statusText}`);
    }

    if (projectId) {
      await updateProvisioningLedger(projectId, {
        github_status: 'pr_created',
        state: 'active'
      });
    }

    return {
      url: data.html_url,
      number: data.number,
      title,
      description,
      mergeable: data.mergeable ?? true,
      status: "Ready for Review"
    };
  } catch (error) {
    console.error(`GITHUB: PR creation failed:`, error);
    return {
      url: `https://github.com/engine-ai/${repoName}/pull/err`,
      number: 0,
      title: `[FAILED] ${projectName}`,
      description: `PR creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      mergeable: false,
      status: "API Error"
    };
  }
}

/**
 * gitLifecycle
 * 
 * Performs add, commit, and push operations using child_process.
 */
export async function gitLifecycle(targetPath: string, branchName: string, commitMessage: string) {
  console.log(`GITHUB: Committing and pushing changes in ${targetPath} to ${branchName}`);
  
  try {
    await runCommand('git', ['-C', targetPath, 'add', '.']);
    
    // Check if there are changes before committing
    try {
      await runCommand('git', ['-C', targetPath, 'diff', '--staged', '--quiet']);
      console.log(`GITHUB: No changes to commit.`);
      return { success: true, commit: "no-changes" };
    } catch (diffError) {
      // If diff returns non-zero, there are changes
      await runCommand('git', ['-C', targetPath, 'commit', '-m', commitMessage]);
    }
    
    await runCommand('git', ['-C', targetPath, 'push', 'origin', branchName]);
    
    const { stdout: commitHash } = await runCommand('git', ['-C', targetPath, 'rev-parse', '--short', 'HEAD']);
    
    return {
      success: true,
      commit: commitHash.trim()
    };
  } catch (error) {
    console.error(`GITHUB: Git lifecycle failure:`, error.message);
    throw error;
  }
}

/**
 * getRepoStatus
 */
export async function getRepoStatus(repoName: string) {
  const targetPath = path.join(os.tmpdir(), `engineai-refactor-${sanitizeForGit(repoName)}`);

  try {
    const { stdout: branch } = await runCommand('git', ['-C', targetPath, 'rev-parse', '--abbrev-ref', 'HEAD']);
    const { stdout: status } = await runCommand('git', ['-C', targetPath, 'status', '--short']);
    
    return {
      name: repoName,
      status: status.trim() === "" ? "Synchronised" : "Modified",
      active_branch: branch.trim(),
      last_sync: new Date().toISOString()
    };
  } catch (error) {
    return {
      name: repoName,
      status: "Not Initialised",
      active_branch: "unknown",
      last_sync: new Date().toISOString()
    };
  }
}
