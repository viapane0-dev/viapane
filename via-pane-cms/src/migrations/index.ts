import * as migration_20260202_222507_initial from './20260202_222507_initial';

export const migrations = [
  {
    up: migration_20260202_222507_initial.up,
    down: migration_20260202_222507_initial.down,
    name: '20260202_222507_initial'
  },
];
