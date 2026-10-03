import * as migration_20261003_215311_initial from './20261003_215311_initial';

export const migrations = [
  {
    up: migration_20261003_215311_initial.up,
    down: migration_20261003_215311_initial.down,
    name: '20261003_215311_initial'
  },
];
