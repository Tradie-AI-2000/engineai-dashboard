import { Project, VariableDeclarationKind } from 'ts-morph';
import fs from 'fs';
import path from 'path';

/**
 * AST Engine Utility
 */

export interface TransformationRule {
  targetVariable: string;
  newValue: string;
  comment?: string;
}

export async function refactorBlueprint(filePath: string, rules: TransformationRule[]) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CRITICAL: Source file not found at ${filePath}`);
  }

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  console.log(`AST: Initialising refactor for ${filePath}`);

  rules.forEach(rule => {
    const variable = sourceFile.getVariableDeclaration(rule.targetVariable);
    
    if (variable) {
      console.log(`AST: Updating ${rule.targetVariable} to ${rule.newValue}`);
      
      // Safety: Use JSON.stringify to handle quotes and escaping correctly
      variable.setInitializer(JSON.stringify(rule.newValue));
      
      if (rule.comment) {
        const statement = variable.getVariableStatement();
        if (statement) statement.addJsDoc(rule.comment);
      }
    } else {
      // Critical: Don't skip silently. Blueprint must match metadata.
      throw new Error(`AST FAILURE: Variable ${rule.targetVariable} missing from blueprint.`);
    }
  });

  const diagnostics = sourceFile.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    throw new Error(`AST FAILURE: Syntax errors detected. ${diagnostics[0].getMessageText()}`);
  }

  await sourceFile.save();
  
  return {
    file: filePath,
    status: "Synchronised",
    timestamp: new Date().toISOString()
  };
}

export async function createBlueprintPlaceholder(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const project = new Project();
  const sourceFile = project.createSourceFile(filePath, `
    export const ORG_NAME = 'BLUEPRINT_ORG';
    export const CLIENT_ID = 'BLUEPRINT_ID';
    export const APP_ENV = 'development';
  `, { overwrite: true });

  await sourceFile.save();
}
