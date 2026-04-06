/**
 * GitHub MCP Wrapper Utility
 */

export const sanitizeForGit = (input: string) => 
  input.toLowerCase().replace(/[^a-z0-9._/-]/g, '-');

const STATUS_ORDER = ['backlog', 'ready-for-dev', 'in-progress', 'review', 'done'];

function getStatusWeight(status: string): number {
  return STATUS_ORDER.indexOf(status);
}

/**
 * resolveConflict
 * Basic generic conflict resolution (prefers HEAD)
 */
export function resolveConflict(content: string): string {
  const conflictRegex = /<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> .+/g;
  return content.replace(conflictRegex, '$1');
}

/**
 * resolveSprintStatusConflict
 * Specific strategy for merging development_status keys in sprint-status.yaml.
 * Ensures that if a story has different statuses in conflicting branches, 
 * the one further along in the lifecycle is preserved.
 */
export function resolveSprintStatusConflict(content: string): string {
  const conflictRegex = /<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> .+/g;
  
  return content.replace(conflictRegex, (match, head, branch) => {
    const lineRegex = /^\s+([\w-]+):\s+(\w+)$/m;
    if (lineRegex.test(head) || lineRegex.test(branch)) {
      const mergedMap = new Map<string, string>();
      
      const processLines = (text: string) => {
        const lines = text.split('\n');
        for (const line of lines) {
          const m = line.match(/^\s+([\w-]+):\s+(\w+)$/);
          if (m) {
            const [_, key, status] = m;
            const existingStatus = mergedMap.get(key);
            if (!existingStatus || getStatusWeight(status) > getStatusWeight(existingStatus)) {
              mergedMap.set(key, status);
            }
          }
        }
      };

      processLines(head);
      processLines(branch);

      const sortedKeys = Array.from(mergedMap.keys()).sort();
      return sortedKeys.map(k => `  ${k}: ${mergedMap.get(k)}`).join('\n');
    }
    
    return head;
  });
}

export async function createRefactorBranch(repoName: string, projectId: string) {
  const sanitizedRepo = sanitizeForGit(repoName);
  const sanitizedId = sanitizeForGit(projectId);
  const branchName = `feat/refactor-${sanitizedId}`;
  
  console.log(`GITHUB: Initialising branch ${branchName} for repo ${sanitizedRepo}`);
  
  const simulatedMetadata = {
    branch: branchName,
    commit: "7f3a2b1c",
    status: "Authorised",
    url: `https://github.com/engine-ai/${repoName}/tree/${branchName}`
  };

  return simulatedMetadata;
}

/**
 * createPullRequest (Simulated for Phase 1)
 * 
 * Generates an automated pull request for the refactor branch.
 * Uses NZ English for title and descriptions.
 */
export async function createPullRequest(repoName: string, branchName: string, projectName: string) {
  const title = `[EngineAI OS] Refactor: ${projectName}`;
  const description = `Initialising automated refactor for ${projectName}. Optimising organisation constants and synchronising blueprint-to-instance mappings.`;
  
  // Simulation: Check for mergeability (90% success probability)
  const isMergeable = Math.random() > 0.1;

  const simulatedPR = {
    url: `https://github.com/engine-ai/${repoName}/pull/${Math.floor(Math.random() * 1000)}`,
    number: Math.floor(Math.random() * 1000),
    title,
    description,
    mergeable: isMergeable,
    status: isMergeable ? "Ready for Review" : "Conflict Detected"
  };

  console.log(`GITHUB: PR ${simulatedPR.number} created for ${projectName}. Mergeable: ${isMergeable}`);
  
  return simulatedPR;
}

/**
 * getRepoStatus
 */
export async function getRepoStatus(repoName: string) {
  return {
    name: repoName,
    status: "Synchronised",
    active_branch: "main",
    last_sync: new Date().toISOString()
  };
}
