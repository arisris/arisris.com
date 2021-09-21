SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `blog_posts` (
  `id` bigint(20) NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `post_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'post',
  `post_status` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `blog_relations` (
  `id` bigint(20) NOT NULL,
  `term_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `blog_terms` (
  `id` bigint(20) NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `term_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'categories'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `blog_relations`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,
  ADD KEY `term_id` (`term_id`),
  ADD KEY `post_id` (`post_id`);

ALTER TABLE `blog_terms`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;