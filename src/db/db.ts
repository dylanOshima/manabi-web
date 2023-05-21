import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import lodash from 'lodash';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import MOCK_DB_DATA, { TDB } from './mock-db-data';

// Chainable Low
class LowChainable<T> extends Low<T> {
  query: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile<TDB>(file);
const db = new LowChainable<TDB>(adapter, MOCK_DB_DATA);

export default db;