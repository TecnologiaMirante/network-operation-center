-- CreateTable
CREATE TABLE `conteudo_has_itens` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_conteudo` VARCHAR(191) NOT NULL,
    `id_aula` VARCHAR(191) NULL,
    `id_atividade` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conteudo_has_itens` ADD CONSTRAINT `conteudo_has_itens_id_conteudo_fkey` FOREIGN KEY (`id_conteudo`) REFERENCES `conteudos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_itens` ADD CONSTRAINT `conteudo_has_itens_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_itens` ADD CONSTRAINT `conteudo_has_itens_id_atividade_fkey` FOREIGN KEY (`id_atividade`) REFERENCES `bimestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
