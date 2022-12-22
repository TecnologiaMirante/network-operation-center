/*
  Warnings:

  - You are about to drop the `messages_alunos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages_professores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `messages_alunos` DROP FOREIGN KEY `messages_alunos_id_aluno_fkey`;

-- DropForeignKey
ALTER TABLE `messages_alunos` DROP FOREIGN KEY `messages_alunos_id_room_fkey`;

-- DropForeignKey
ALTER TABLE `messages_professores` DROP FOREIGN KEY `messages_professores_id_professor_fkey`;

-- DropForeignKey
ALTER TABLE `messages_professores` DROP FOREIGN KEY `messages_professores_id_room_fkey`;

-- DropTable
DROP TABLE `messages_alunos`;

-- DropTable
DROP TABLE `messages_professores`;

-- CreateTable
CREATE TABLE `messages` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_room` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_id_room_fkey` FOREIGN KEY (`id_room`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
