-- AlterTable
ALTER TABLE `lembretes` ADD COLUMN `id_aluno` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `lembretes` ADD CONSTRAINT `lembretes_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
