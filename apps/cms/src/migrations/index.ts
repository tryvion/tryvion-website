import * as migration_20260911_071221 from './20260911_071221';
import * as migration_20260911_100801 from './20260911_100801';

export const migrations = [
  {
    up: migration_20260911_071221.up,
    down: migration_20260911_071221.down,
    name: '20260911_071221',
  },
  {
    up: migration_20260911_100801.up,
    down: migration_20260911_100801.down,
    name: '20260911_100801'
  },
];
