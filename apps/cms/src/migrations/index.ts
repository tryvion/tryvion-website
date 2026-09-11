import * as migration_20260911_071221 from './20260911_071221';

export const migrations = [
  {
    up: migration_20260911_071221.up,
    down: migration_20260911_071221.down,
    name: '20260911_071221'
  },
];
