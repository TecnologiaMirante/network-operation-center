-- CreateTable
CREATE TABLE `conquistas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('ALCANCE_MEDIA_X', 'RESPONDA_X_ATIVIDADE', 'NOTA_X_EM_Y_ATIVIDADES', 'ASSISTA_X_MINUTOS_DE_AULA', 'MAIOR_PONTUACAO_NA_X_AO_FIM_DO_BIMESTRE', 'X_DIAS_SEGUIDOS_NO_APLICATIVO') NOT NULL,
    `objective` VARCHAR(191) NOT NULL,
    `objective_secondary` VARCHAR(191) NOT NULL,
    `discipline` VARCHAR(191) NOT NULL,
    `difficulty` ENUM('easy', 'normal', 'hard', 'very_hard') NOT NULL DEFAULT 'normal',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
