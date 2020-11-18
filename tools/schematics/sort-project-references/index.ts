import { chain, Rule } from '@angular-devkit/schematics';
import { updateJsonInTree, formatFiles } from '@nrwl/workspace';

function sortObjectByKeys(obj: any) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}

function incrementVersion(): Rule {
  return updateJsonInTree('workspace.json', (json) => {
    json.version++;
    return json;
  });
}

function sortWorkspaceProjects(): Rule {
  return updateJsonInTree('workspace.json', (json) => {
    json.projects = sortObjectByKeys(json.projects);
    return json;
  });
}

function sortNXProjects(): Rule {
  return updateJsonInTree('nx.json', (json) => {
    json.projects = sortObjectByKeys(json.projects);
    return json;
  });
}

function sortTsconfigPaths(): Rule {
  return updateJsonInTree('tsconfig.base.json', (json) => {
    json.compilerOptions.paths = sortObjectByKeys(json.compilerOptions.paths);
    return json;
  });
}

export default function (): Rule {
  return chain([
    incrementVersion(),
    sortWorkspaceProjects(),
    sortNXProjects(),
    sortTsconfigPaths(),
    formatFiles()
  ]);
}