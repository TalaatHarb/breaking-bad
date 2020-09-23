import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import {
  NodeDependencyType, NodeDependency, addPackageJsonDependency,
  WorkspaceProject, getWorkspace, getProjectFromWorkspace, addModuleImportToRootModule
} from 'schematics-utilities';

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
      { type: NodeDependencyType.Default, version: '~0.0.1', name: 'breaking-bad-chars' }
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
    const workspace = getWorkspace(host);
    const project: any = getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace[PROJECTS_KEY])[0]
    );
    const moduleName = 'BreakingBadCharsModule';

    const castedProject: WorkspaceProject = project as WorkspaceProject;

    addModuleImportToRootModule(host, moduleName, 'breaking-bad-chars', castedProject);
    context.logger.log('info', `✅️ "${moduleName}" is imported`);

    return host;
  };
}
