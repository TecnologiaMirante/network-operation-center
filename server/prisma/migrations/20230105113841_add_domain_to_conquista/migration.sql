/*
  Warnings:

  - You are about to drop the column `discipline` on the `conquistas` table. All the data in the column will be lost.
  - Added the required column `domain` to the `conquistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conquistas` DROP COLUMN `discipline`,
    ADD COLUMN `domain` ENUM('especifico', 'geral') NOT NULL,
    ADD COLUMN `id_disciplina` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `conquistas` ADD CONSTRAINT `conquistas_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
