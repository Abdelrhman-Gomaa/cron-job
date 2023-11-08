import { faker } from '@faker-js/faker';
import { Log } from './models/log.model';

export type LogType = {
  content: string;
};

function buildParams(input = <any>{}, returnInputOnly: boolean): LogType {
  return {
    content: `LOG -${faker.random.words()}`
  };
}

export const LogsFactory = async (count: number = 100, input = <any>{}) => {
  let logs = [];
  for (let i = 0; i < count; i++) logs.push(buildParams(input, false));
  return await Log.query().insert(logs);
};
