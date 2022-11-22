-- CreateTable
CREATE TABLE `progressos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_aluno` VARCHAR(191) NOT NULL,
    `id_aula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `progressos` ADD CONSTRAINT `progressos_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progressos` ADD CONSTRAINT `progressos_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
