import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

interface UtilSchema {
  name: string,
  directory: string
}

export default function(schema: UtilSchema): Rule {
 return chain([
   externalSchematic('@nrwl/workspace', 'lib', {
     name: `util-${schema.name}`,
     linter: 'tslint',
     directory: schema.directory,
     tags: `type:util', scope:${schema.directory}`
   })
 ]);
}