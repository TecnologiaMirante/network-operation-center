-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_id_user_fkey`;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
