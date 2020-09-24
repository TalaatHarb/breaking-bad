import { chain, noop, Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { NodeDependency, NodeDependencyType, addPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { JsonParseMode, parseJson } from '@angular-devkit/core';
import { InsertChange } from '@schematics/angular/utility/change';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { SourceFile } from 'typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { createSourceFile, ScriptTarget } from 'typescript';

const PROJECTS_KEY = 'projects';

export function addChars(options: any): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
    options && options.skipPackageJson ? noop() : installPackageJsonDependencies(),
    options && options.skipModuleImport ? noop() : addModuleToImports(options)
  ]);
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^0.0.1', name: 'breaking-bad-chars' }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

function addModuleToImports(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = SchematicsUtilities.getWorkspace(host);
    const project: any = SchematicsUtilities.getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace[PROJECTS_KEY])[0]
    );
    const moduleName = 'BreakingBadCharsModule';

    SchematicsUtilities.addModuleImportToRootModule(host, moduleName, 'breaking-bad-chars', project);
    context.logger.log('info', `✅️ "${moduleName}" is imported`);

    return host;
  };
}

export class SchematicsUtilities {

  static getWorkspacePath(host: Tree): string {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    const path = possibleFiles.filter(p => host.exists(p))[0];
    return path;
  }

  static getWorkspace(host: Tree): WorkspaceSchema {
    const path = SchematicsUtilities.getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
      throw new SchematicsException(`Could not find (${path})`);
    }
    const content = configBuffer.toString();

    return (parseJson(content, JsonParseMode.Loose) as {}) as WorkspaceSchema;
  }

  static getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject {
    const name: string = (projectName) ? projectName : (workspace.defaultProject as string);
    const project = workspace.projects[name];

    if (!project) {
      throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
    }

    return project;
  }


  static addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject): void {
    const modulePath = getAppModulePath(host, SchematicsUtilities.getProjectMainFile(project));
    SchematicsUtilities.addModuleImportToModule(host, modulePath, moduleName, src);
  }

  static getProjectTargetOptions(project: WorkspaceProject, buildTarget: string): any {
    if (project.targets && project.targets[buildTarget] && project.targets[buildTarget].options) {
      return project.targets[buildTarget].options;
    }

    if (project.architect && project.architect[buildTarget] && project.architect[buildTarget].options) {
      return project.architect[buildTarget].options;
    }

    throw new SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
  }

  static getProjectMainFile(project: WorkspaceProject): string {
    const buildOptions = SchematicsUtilities.getProjectTargetOptions(project, 'build');

    if (!buildOptions.main) {
      throw new SchematicsException(
        `Could not find the project main file inside of the ` + `workspace config (${project.sourceRoot})`
      );
    }

    return buildOptions.main;
  }

  static getSourceFile(host: Tree, path: string): SourceFile {
    const buffer = host.read(path);
    if (!buffer) {
      throw new SchematicsException(`Could not find file for path: ${path}`);
    }
    return createSourceFile(path, buffer.toString(), ScriptTarget.Latest, true);
  }

  static addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void {
    const moduleSource: any = SchematicsUtilities.getSourceFile(host, modulePath);

    if (!moduleSource) {
      throw new SchematicsException(`Module not found: ${modulePath}`);
    }

    const changes = addImportToModule(moduleSource, modulePath, moduleName, src);
    const recorder = host.beginUpdate(modulePath);

    changes.forEach(change => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);
  }

}
