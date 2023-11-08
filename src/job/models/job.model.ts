import { Model } from 'objection';

export class Job extends Model {
  static get tableName(): string {
    return 'jobs';
  }

  id!: number;
  log!: string;
  deletedAt!: Date | number;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['log'],

      properties: {
        id: { type: 'integer' },
        log: { type: 'string', minLength: 1 },
        deletedAt: { type: 'string' }
      }
    };
  }
}
