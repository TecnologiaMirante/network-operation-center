-- DropForeignKey
ALTER TABLE `conteudo_has_itens` DROP FOREIGN KEY `conteudo_has_itens_id_atividade_fkey`;

-- AddForeignKey
ALTER TABLE `conteudo_has_itens` ADD CONSTRAINT `conteudo_has_itens_id_atividade_fkey` FOREIGN KEY (`id_atividade`) REFERENCES `atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
