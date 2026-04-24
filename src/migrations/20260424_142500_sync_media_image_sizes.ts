import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar;

    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_url" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_width" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_height" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_mime_type" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filesize" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filename" varchar;

    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_url" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_width" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_height" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_mime_type" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_filesize" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_filename" varchar;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'media'
          AND column_name = 'sizes_thumb_url'
      ) THEN
        UPDATE "media"
        SET
          "sizes_thumbnail_url" = COALESCE("sizes_thumbnail_url", "sizes_thumb_url"),
          "sizes_thumbnail_width" = COALESCE("sizes_thumbnail_width", "sizes_thumb_width"),
          "sizes_thumbnail_height" = COALESCE("sizes_thumbnail_height", "sizes_thumb_height"),
          "sizes_thumbnail_mime_type" = COALESCE("sizes_thumbnail_mime_type", "sizes_thumb_mime_type"),
          "sizes_thumbnail_filesize" = COALESCE("sizes_thumbnail_filesize", "sizes_thumb_filesize"),
          "sizes_thumbnail_filename" = COALESCE("sizes_thumbnail_filename", "sizes_thumb_filename");
      END IF;
    END $$;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'media'
          AND column_name = 'sizes_medium_url'
      ) THEN
        UPDATE "media"
        SET
          "sizes_card_url" = COALESCE("sizes_card_url", "sizes_medium_url"),
          "sizes_card_width" = COALESCE("sizes_card_width", "sizes_medium_width"),
          "sizes_card_height" = COALESCE("sizes_card_height", "sizes_medium_height"),
          "sizes_card_mime_type" = COALESCE("sizes_card_mime_type", "sizes_medium_mime_type"),
          "sizes_card_filesize" = COALESCE("sizes_card_filesize", "sizes_medium_filesize"),
          "sizes_card_filename" = COALESCE("sizes_card_filename", "sizes_medium_filename");
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx"
      ON "media" USING btree ("sizes_thumbnail_filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx"
      ON "media" USING btree ("sizes_card_filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_hero_sizes_hero_filename_idx"
      ON "media" USING btree ("sizes_hero_filename");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
    DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";

    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";

    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
  `)
}
