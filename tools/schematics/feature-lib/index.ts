import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

interface FeatureSchema {
  name: string,
  directory: string
}

export default function(schema: FeatureSchema): Rule {
 return chain([
   externalSchematic('@nrwl/workspace', 'lib', {
     name: `feature-${schema.name}`,
     linter: 'tslint',
     directory: schema.directory,
     tags: `type:feature', scope:${schema.directory}`
   })
 ]);
}