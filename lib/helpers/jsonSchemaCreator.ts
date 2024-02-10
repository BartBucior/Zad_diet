import * as fs from 'fs/promises';
import { createSchema } from 'genson-js';

export class JSONschemaCreator {
  constructor() {}

  async createJsonSchema(name: string, path: string, json: object): Promise<void> {
    const filePath = `.jsonSchemas/${path}`;

    try {
      await fs.mkdir(filePath, { recursive: true });

      const schema = createSchema(json);
      const schemaString = JSON.stringify(schema, null, 2);
      const schemaName = `.jsonSchemas/${path}/${name}_schema.json`;

      await this.writeJsonFile(schemaName, schemaString);
      // eslint-disable-next-line no-console
      console.log('JSON Schema created and saved.');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private async writeJsonFile(location: string, data: string): Promise<void> {
    try {
      await fs.writeFile(location, data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}
