import fs from 'fs';
import path from 'path';
import {getSchema} from '@risingstack/graffiti-mongoose';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

import LiveResultSchema from '../data/schema/LiveResultSchema';

const schema = getSchema(LiveResultSchema);

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error( // eslint-disable-line no-console
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../data/schema.json'),
      JSON.stringify(result, null, 2)
    );
    console.log("This Schema write!");
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../data/schema.graphql'),
  printSchema(schema)
);
