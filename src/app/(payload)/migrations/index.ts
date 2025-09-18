import * as migration_20250723_213910 from './20250723_213910'

export const migrations = [
  {
    up: migration_20250723_213910.up,
    down: migration_20250723_213910.down,
    name: '20250723_213910',
  },
]
