/*
  Warnings:

  - Added the required column `id_disciplina` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_serie` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `atividades` ADD COLUMN `id_disciplina` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_serie` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
