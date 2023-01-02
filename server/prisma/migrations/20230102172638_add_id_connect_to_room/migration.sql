/*
  Warnings:

  - A unique constraint covering the columns `[id_connected]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `id_connected` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_id_connected_key` ON `Room`(`id_connected`);
