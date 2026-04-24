import * as migration_20260423_103247_init_postgres from './20260423_103247_init_postgres';
import * as migration_20260424_142500_sync_media_image_sizes from './20260424_142500_sync_media_image_sizes';

export const migrations = [
  {
    up: migration_20260423_103247_init_postgres.up,
    down: migration_20260423_103247_init_postgres.down,
    name: '20260423_103247_init_postgres'
  },
  {
    up: migration_20260424_142500_sync_media_image_sizes.up,
    down: migration_20260424_142500_sync_media_image_sizes.down,
    name: '20260424_142500_sync_media_image_sizes'
  },
];
