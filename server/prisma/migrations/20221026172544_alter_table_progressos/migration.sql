/*
  Warnings:

  - Added the required column `id_bimestre` to the `progressos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progressos` ADD COLUMN `id_bimestre` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `progressos` ADD CONSTRAINT `progressos_id_bimestre_fkey` FOREIGN KEY (`id_bimestre`) REFERENCES `bimestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
