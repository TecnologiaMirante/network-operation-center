/*
  Warnings:

  - A unique constraint covering the columns `[id_socket]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_socket` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `id_socket` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_id_socket_key` ON `Room`(`id_socket`);
