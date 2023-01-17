-- AlterTable
ALTER TABLE `lembretes` ADD COLUMN `id_disciplina` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `lembretes` ADD CONSTRAINT `lembretes_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
