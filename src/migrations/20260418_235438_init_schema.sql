CREATE TABLE `jobs_requirements` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`requirement` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `jobs_requirements_order_idx` ON `jobs_requirements` (`_order`);

CREATE INDEX `jobs_requirements_parent_id_idx` ON `jobs_requirements` (`_parent_id`);

CREATE TABLE `jobs` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text,
  	`icon` text DEFAULT '💼',
  	`category` text,
  	`location` text,
  	`type` text DEFAULT 'full-time',
  	`level` text,
  	`salary` text,
  	`tag` text,
  	`description` text,
  	`benefits` text,
  	`status` text DEFAULT 'active',
  	`published_at` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );

CREATE UNIQUE INDEX `jobs_slug_idx` ON `jobs` (`slug`);

CREATE INDEX `jobs_updated_at_idx` ON `jobs` (`updated_at`);

CREATE INDEX `jobs_created_at_idx` ON `jobs` (`created_at`);

CREATE TABLE `posts` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text,
  	`category` text,
  	`excerpt` text,
  	`content` text,
  	`featured_image_id` integer,
  	`external_image_url` text,
  	`author` text,
  	`read_time` text,
  	`featured` integer DEFAULT false,
  	`published_at` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );

CREATE UNIQUE INDEX `posts_slug_idx` ON `posts` (`slug`);

CREATE INDEX `posts_featured_image_idx` ON `posts` (`featured_image_id`);

CREATE INDEX `posts_updated_at_idx` ON `posts` (`updated_at`);

CREATE INDEX `posts_created_at_idx` ON `posts` (`created_at`);

CREATE TABLE `applications` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`full_name` text NOT NULL,
  	`email` text NOT NULL,
  	`phone` text NOT NULL,
  	`linked_in` text,
  	`position_id` integer,
  	`position_text` text,
  	`experience` text,
  	`expected_salary` text,
  	`cv_id` integer,
  	`cover_letter` text,
  	`status` text DEFAULT 'new',
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`position_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`cv_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );

CREATE INDEX `applications_position_idx` ON `applications` (`position_id`);

CREATE INDEX `applications_cv_idx` ON `applications` (`cv_id`);

CREATE INDEX `applications_updated_at_idx` ON `applications` (`updated_at`);

CREATE INDEX `applications_created_at_idx` ON `applications` (`created_at`);

CREATE TABLE `media_variants` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`name` text,
  	`url` text,
  	`width` numeric,
  	`height` numeric,
  	`file_size` numeric,
  	FOREIGN KEY (`_parent_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `media_variants_order_idx` ON `media_variants` (`_order`);

CREATE INDEX `media_variants_parent_id_idx` ON `media_variants` (`_parent_id`);

CREATE TABLE `media` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`alt` text,
  	`original_file_size` numeric,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`url` text,
  	`thumbnail_u_r_l` text,
  	`filename` text,
  	`mime_type` text,
  	`filesize` numeric,
  	`width` numeric,
  	`height` numeric,
  	`focal_x` numeric,
  	`focal_y` numeric,
  	`sizes_hero_url` text,
  	`sizes_hero_width` numeric,
  	`sizes_hero_height` numeric,
  	`sizes_hero_mime_type` text,
  	`sizes_hero_filesize` numeric,
  	`sizes_hero_filename` text,
  	`sizes_large_url` text,
  	`sizes_large_width` numeric,
  	`sizes_large_height` numeric,
  	`sizes_large_mime_type` text,
  	`sizes_large_filesize` numeric,
  	`sizes_large_filename` text,
  	`sizes_medium_url` text,
  	`sizes_medium_width` numeric,
  	`sizes_medium_height` numeric,
  	`sizes_medium_mime_type` text,
  	`sizes_medium_filesize` numeric,
  	`sizes_medium_filename` text,
  	`sizes_thumb_url` text,
  	`sizes_thumb_width` numeric,
  	`sizes_thumb_height` numeric,
  	`sizes_thumb_mime_type` text,
  	`sizes_thumb_filesize` numeric,
  	`sizes_thumb_filename` text
  );

CREATE INDEX `media_updated_at_idx` ON `media` (`updated_at`);

CREATE INDEX `media_created_at_idx` ON `media` (`created_at`);

CREATE UNIQUE INDEX `media_filename_idx` ON `media` (`filename`);

CREATE INDEX `media_sizes_hero_sizes_hero_filename_idx` ON `media` (`sizes_hero_filename`);

CREATE INDEX `media_sizes_large_sizes_large_filename_idx` ON `media` (`sizes_large_filename`);

CREATE INDEX `media_sizes_medium_sizes_medium_filename_idx` ON `media` (`sizes_medium_filename`);

CREATE INDEX `media_sizes_thumb_sizes_thumb_filename_idx` ON `media` (`sizes_thumb_filename`);

CREATE TABLE `users_sessions` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`created_at` text,
  	`expires_at` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `users_sessions_order_idx` ON `users_sessions` (`_order`);

CREATE INDEX `users_sessions_parent_id_idx` ON `users_sessions` (`_parent_id`);

CREATE TABLE `users` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`email` text NOT NULL,
  	`reset_password_token` text,
  	`reset_password_expiration` text,
  	`salt` text,
  	`hash` text,
  	`login_attempts` numeric DEFAULT 0,
  	`lock_until` text
  );

CREATE INDEX `users_updated_at_idx` ON `users` (`updated_at`);

CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);

CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);

CREATE TABLE `payload_kv` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text NOT NULL,
  	`data` text NOT NULL
  );

CREATE UNIQUE INDEX `payload_kv_key_idx` ON `payload_kv` (`key`);

CREATE TABLE `payload_locked_documents` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`global_slug` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );

CREATE INDEX `payload_locked_documents_global_slug_idx` ON `payload_locked_documents` (`global_slug`);

CREATE INDEX `payload_locked_documents_updated_at_idx` ON `payload_locked_documents` (`updated_at`);

CREATE INDEX `payload_locked_documents_created_at_idx` ON `payload_locked_documents` (`created_at`);

CREATE TABLE `payload_locked_documents_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`jobs_id` integer,
  	`posts_id` integer,
  	`applications_id` integer,
  	`media_id` integer,
  	`users_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_locked_documents`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`jobs_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`posts_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`applications_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `payload_locked_documents_rels_order_idx` ON `payload_locked_documents_rels` (`order`);

CREATE INDEX `payload_locked_documents_rels_parent_idx` ON `payload_locked_documents_rels` (`parent_id`);

CREATE INDEX `payload_locked_documents_rels_path_idx` ON `payload_locked_documents_rels` (`path`);

CREATE INDEX `payload_locked_documents_rels_jobs_id_idx` ON `payload_locked_documents_rels` (`jobs_id`);

CREATE INDEX `payload_locked_documents_rels_posts_id_idx` ON `payload_locked_documents_rels` (`posts_id`);

CREATE INDEX `payload_locked_documents_rels_applications_id_idx` ON `payload_locked_documents_rels` (`applications_id`);

CREATE INDEX `payload_locked_documents_rels_media_id_idx` ON `payload_locked_documents_rels` (`media_id`);

CREATE INDEX `payload_locked_documents_rels_users_id_idx` ON `payload_locked_documents_rels` (`users_id`);

CREATE TABLE `payload_preferences` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text,
  	`value` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );

CREATE INDEX `payload_preferences_key_idx` ON `payload_preferences` (`key`);

CREATE INDEX `payload_preferences_updated_at_idx` ON `payload_preferences` (`updated_at`);

CREATE INDEX `payload_preferences_created_at_idx` ON `payload_preferences` (`created_at`);

CREATE TABLE `payload_preferences_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`users_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_preferences`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );

CREATE INDEX `payload_preferences_rels_order_idx` ON `payload_preferences_rels` (`order`);

CREATE INDEX `payload_preferences_rels_parent_idx` ON `payload_preferences_rels` (`parent_id`);

CREATE INDEX `payload_preferences_rels_path_idx` ON `payload_preferences_rels` (`path`);

CREATE INDEX `payload_preferences_rels_users_id_idx` ON `payload_preferences_rels` (`users_id`);

CREATE TABLE `payload_migrations` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`name` text,
  	`batch` numeric,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );

CREATE INDEX `payload_migrations_updated_at_idx` ON `payload_migrations` (`updated_at`);

CREATE INDEX `payload_migrations_created_at_idx` ON `payload_migrations` (`created_at`);
