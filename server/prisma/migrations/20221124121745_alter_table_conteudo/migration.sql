-- AlterTable
ALTER TABLE `conteudos` ADD COLUMN `id_serie` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `conteudos` ADD CONSTRAINT `conteudos_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
