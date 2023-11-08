import { Model } from 'objection';

export class Job extends Model {
  static get tableName(): string {
    return 'jobs';
  }

  id!: number;
  isActive!: boolean;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['isActive'],

      properties: {
        id: { type: 'integer' },
        log: { type: 'boolean' },
      }
    };
  }
}
