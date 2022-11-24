/*
  Warnings:

  - Made the column `id_serie` on table `conteudos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `conteudos` DROP FOREIGN KEY `conteudos_id_serie_fkey`;

-- AlterTable
ALTER TABLE `conteudos` MODIFY `id_serie` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `conteudos` ADD CONSTRAINT `conteudos_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
