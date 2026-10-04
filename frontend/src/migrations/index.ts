import * as migration_20261003_215311_initial from './20261003_215311_initial';
import * as migration_20261004_005846_site_copy from './20261004_005846_site_copy';
import * as migration_20261004_014309_feedback from './20261004_014309_feedback';

export const migrations = [
  {
    up: migration_20261003_215311_initial.up,
    down: migration_20261003_215311_initial.down,
    name: '20261003_215311_initial',
  },
  {
    up: migration_20261004_005846_site_copy.up,
    down: migration_20261004_005846_site_copy.down,
    name: '20261004_005846_site_copy',
  },
  {
    up: migration_20261004_014309_feedback.up,
    down: migration_20261004_014309_feedback.down,
    name: '20261004_014309_feedback',
  },
];
