/*
  Warnings:

  - Made the column `id_socket` on table `user_rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_connected` on table `user_rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_rooms` MODIFY `id_socket` VARCHAR(191) NOT NULL,
    MODIFY `id_connected` VARCHAR(191) NOT NULL;
