-- CreateTable
CREATE TABLE `secretarias` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secretaria_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mat` VARCHAR(191) NOT NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_secretaria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escolas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `school_type` ENUM('municipal', 'estadual', 'privada') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_secretaria` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `isAuthenticated` BOOLEAN NOT NULL DEFAULT false,
    `cpf` VARCHAR(191) NULL,
    `mat` VARCHAR(191) NULL,
    `born` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_escola` VARCHAR(191) NULL,
    `id_responsavel` VARCHAR(191) NULL,

    UNIQUE INDEX `escola_users_cpf_key`(`cpf`),
    UNIQUE INDEX `escola_users_mat_key`(`mat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsaveis` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `cpf` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `responsaveis_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_user_has_addresses` (
    `id` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `address_continued` VARCHAR(191) NULL,
    `zip_code` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_user_has_phones` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_user_has_socials` (
    `id` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_user_types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escola_user_has_types` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_escola_user` VARCHAR(191) NOT NULL,
    `id_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_has_permissoes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_type` VARCHAR(191) NOT NULL,
    `id_permissao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_has_permissoes_custom` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_type` VARCHAR(191) NOT NULL,
    `id_permissao` VARCHAR(191) NOT NULL,
    `id_escola_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professores` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `id_escola_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `status` ENUM('ativo', 'inativo', 'cancelado') NOT NULL DEFAULT 'ativo',
    `icon` VARCHAR(191) NULL DEFAULT '',
    `bk_img` VARCHAR(191) NULL DEFAULT '',
    `bk_color` VARCHAR(191) NULL DEFAULT '',
    `id_escola` VARCHAR(191) NULL,

    UNIQUE INDEX `disciplinas_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_escola` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `shift` ENUM('integral', 'matutino', 'vespertino', 'noturno') NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `status` ENUM('ativo', 'inativo', 'cancelado') NOT NULL DEFAULT 'ativo',
    `id_serie` VARCHAR(191) NULL,

    UNIQUE INDEX `turmas_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professor_has_disciplinas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_professor` VARCHAR(191) NOT NULL,
    `id_disciplina` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professor_has_disciplinas_turmas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_professor_has_disciplinas` VARCHAR(191) NOT NULL,
    `id_turma` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `serie_has_disciplinas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_serie` VARCHAR(191) NOT NULL,
    `id_disciplina` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alunos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `points` DOUBLE NOT NULL DEFAULT 0,
    `id_escola_user` VARCHAR(191) NULL,
    `id_turma` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_aluno` VARCHAR(191) NOT NULL,
    `id_aula` VARCHAR(191) NOT NULL,
    `index` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividades` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `grade` DOUBLE NOT NULL DEFAULT 10,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questoes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `question_type` VARCHAR(191) NOT NULL,
    `grade` DOUBLE NOT NULL DEFAULT 1,
    `difficulty` ENUM('easy', 'normal', 'hard', 'very_hard') NOT NULL DEFAULT 'normal',
    `id_disciplina` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opcoes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `id_questao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividade_has_questoes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_questao` VARCHAR(191) NOT NULL,
    `id_atividade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno_responde_atividades` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `nota` DOUBLE NOT NULL,
    `attempt` INTEGER NOT NULL DEFAULT 1,
    `id_atividade` VARCHAR(191) NOT NULL,
    `id_bimestre` VARCHAR(191) NULL,
    `id_aluno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conteudos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `id_disciplina` VARCHAR(191) NOT NULL,
    `id_bimestre` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conteudo_has_aulas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_conteudo` VARCHAR(191) NOT NULL,
    `id_aula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conteudo_has_atividades` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_conteudo` VARCHAR(191) NOT NULL,
    `id_atividade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aulas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NULL,
    `thumb` VARCHAR(191) NULL,
    `time` VARCHAR(191) NOT NULL,
    `id_serie` VARCHAR(191) NOT NULL,
    `id_disciplina` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aula_has_tags` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_aula` VARCHAR(191) NOT NULL,
    `id_tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anotacoes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `id_aluno` VARCHAR(191) NOT NULL,
    `id_aula` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anotacao_has_tags` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_anotacao` VARCHAR(191) NOT NULL,
    `id_tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lembretes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `id_turma` VARCHAR(191) NULL,
    `id_aluno` VARCHAR(191) NULL,
    `id_professor` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bimestres` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `number` INTEGER NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,
    `id_disciplina` VARCHAR(191) NOT NULL,
    `id_aluno` VARCHAR(191) NOT NULL,
    `id_bimestre` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ranks` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_aluno` VARCHAR(191) NULL,
    `points` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rank_imgs` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `first` VARCHAR(191) NOT NULL DEFAULT '',
    `second` VARCHAR(191) NOT NULL DEFAULT '',
    `third` VARCHAR(191) NOT NULL DEFAULT '',
    `id_rank` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `secretaria_users` ADD CONSTRAINT `secretaria_users_id_secretaria_fkey` FOREIGN KEY (`id_secretaria`) REFERENCES `secretarias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escolas` ADD CONSTRAINT `escolas_id_secretaria_fkey` FOREIGN KEY (`id_secretaria`) REFERENCES `secretarias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_users` ADD CONSTRAINT `escola_users_id_escola_fkey` FOREIGN KEY (`id_escola`) REFERENCES `escolas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_users` ADD CONSTRAINT `escola_users_id_responsavel_fkey` FOREIGN KEY (`id_responsavel`) REFERENCES `responsaveis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_user_has_addresses` ADD CONSTRAINT `escola_user_has_addresses_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_user_has_phones` ADD CONSTRAINT `escola_user_has_phones_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_user_has_socials` ADD CONSTRAINT `escola_user_has_socials_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_user_has_types` ADD CONSTRAINT `escola_user_has_types_id_escola_user_fkey` FOREIGN KEY (`id_escola_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola_user_has_types` ADD CONSTRAINT `escola_user_has_types_id_type_fkey` FOREIGN KEY (`id_type`) REFERENCES `escola_user_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_has_permissoes` ADD CONSTRAINT `type_has_permissoes_id_type_fkey` FOREIGN KEY (`id_type`) REFERENCES `escola_user_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_has_permissoes` ADD CONSTRAINT `type_has_permissoes_id_permissao_fkey` FOREIGN KEY (`id_permissao`) REFERENCES `permissoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_has_permissoes_custom` ADD CONSTRAINT `type_has_permissoes_custom_id_escola_user_fkey` FOREIGN KEY (`id_escola_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_has_permissoes_custom` ADD CONSTRAINT `type_has_permissoes_custom_id_type_fkey` FOREIGN KEY (`id_type`) REFERENCES `escola_user_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_has_permissoes_custom` ADD CONSTRAINT `type_has_permissoes_custom_id_permissao_fkey` FOREIGN KEY (`id_permissao`) REFERENCES `permissoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professores` ADD CONSTRAINT `professores_id_escola_user_fkey` FOREIGN KEY (`id_escola_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinas` ADD CONSTRAINT `disciplinas_id_escola_fkey` FOREIGN KEY (`id_escola`) REFERENCES `escolas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_id_escola_fkey` FOREIGN KEY (`id_escola`) REFERENCES `escolas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor_has_disciplinas` ADD CONSTRAINT `professor_has_disciplinas_id_professor_fkey` FOREIGN KEY (`id_professor`) REFERENCES `professores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor_has_disciplinas` ADD CONSTRAINT `professor_has_disciplinas_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor_has_disciplinas_turmas` ADD CONSTRAINT `professor_has_disciplinas_turmas_id_turma_fkey` FOREIGN KEY (`id_turma`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor_has_disciplinas_turmas` ADD CONSTRAINT `professor_has_disciplinas_turmas_id_professor_has_disciplin_fkey` FOREIGN KEY (`id_professor_has_disciplinas`) REFERENCES `professor_has_disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serie_has_disciplinas` ADD CONSTRAINT `serie_has_disciplinas_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serie_has_disciplinas` ADD CONSTRAINT `serie_has_disciplinas_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_id_escola_user_fkey` FOREIGN KEY (`id_escola_user`) REFERENCES `escola_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_id_turma_fkey` FOREIGN KEY (`id_turma`) REFERENCES `turmas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questoes` ADD CONSTRAINT `questoes_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcoes` ADD CONSTRAINT `opcoes_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `questoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividade_has_questoes` ADD CONSTRAINT `atividade_has_questoes_id_atividade_fkey` FOREIGN KEY (`id_atividade`) REFERENCES `atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividade_has_questoes` ADD CONSTRAINT `atividade_has_questoes_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `questoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_responde_atividades` ADD CONSTRAINT `aluno_responde_atividades_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_responde_atividades` ADD CONSTRAINT `aluno_responde_atividades_id_atividade_fkey` FOREIGN KEY (`id_atividade`) REFERENCES `atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_responde_atividades` ADD CONSTRAINT `aluno_responde_atividades_id_bimestre_fkey` FOREIGN KEY (`id_bimestre`) REFERENCES `bimestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudos` ADD CONSTRAINT `conteudos_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `professores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudos` ADD CONSTRAINT `conteudos_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudos` ADD CONSTRAINT `conteudos_id_bimestre_fkey` FOREIGN KEY (`id_bimestre`) REFERENCES `bimestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_aulas` ADD CONSTRAINT `conteudo_has_aulas_id_conteudo_fkey` FOREIGN KEY (`id_conteudo`) REFERENCES `conteudos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_aulas` ADD CONSTRAINT `conteudo_has_aulas_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_atividades` ADD CONSTRAINT `conteudo_has_atividades_id_atividade_fkey` FOREIGN KEY (`id_atividade`) REFERENCES `atividades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudo_has_atividades` ADD CONSTRAINT `conteudo_has_atividades_id_conteudo_fkey` FOREIGN KEY (`id_conteudo`) REFERENCES `conteudos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aulas` ADD CONSTRAINT `aulas_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aulas` ADD CONSTRAINT `aulas_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula_has_tags` ADD CONSTRAINT `aula_has_tags_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula_has_tags` ADD CONSTRAINT `aula_has_tags_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacoes` ADD CONSTRAINT `anotacoes_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacoes` ADD CONSTRAINT `anotacoes_id_aula_fkey` FOREIGN KEY (`id_aula`) REFERENCES `aulas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacao_has_tags` ADD CONSTRAINT `anotacao_has_tags_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacao_has_tags` ADD CONSTRAINT `anotacao_has_tags_id_anotacao_fkey` FOREIGN KEY (`id_anotacao`) REFERENCES `anotacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembretes` ADD CONSTRAINT `lembretes_id_professor_fkey` FOREIGN KEY (`id_professor`) REFERENCES `professores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembretes` ADD CONSTRAINT `lembretes_id_turma_fkey` FOREIGN KEY (`id_turma`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembretes` ADD CONSTRAINT `lembretes_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_id_disciplina_fkey` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_id_bimestre_fkey` FOREIGN KEY (`id_bimestre`) REFERENCES `bimestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rank_imgs` ADD CONSTRAINT `rank_imgs_id_rank_fkey` FOREIGN KEY (`id_rank`) REFERENCES `ranks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
