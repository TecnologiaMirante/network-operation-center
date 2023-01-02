/*
  Warnings:

  - You are about to drop the column `id_connected` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `id_socket` on the `room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Room_id_connected_key` ON `room`;

-- DropIndex
DROP INDEX `Room_id_socket_key` ON `room`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `id_connected`,
    DROP COLUMN `id_socket`;

-- CreateTable
CREATE TABLE `user_rooms` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_socket` VARCHAR(191) NULL,
    `id_connected` VARCHAR(191) NULL,
    `id_room` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_rooms_id_socket_key`(`id_socket`),
    UNIQUE INDEX `user_rooms_id_connected_key`(`id_connected`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_rooms` ADD CONSTRAINT `user_rooms_id_room_fkey` FOREIGN KEY (`id_room`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
