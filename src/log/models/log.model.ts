import { Model } from 'objection';

export class Log extends Model {
  static get tableName(): string {
    return 'logs';
  }

  id!: number;
  content!: string;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content'],

      properties: {
        id: { type: 'integer' },
        content: { type: 'string', minLength: 1 },
      }
    };
  }
}
