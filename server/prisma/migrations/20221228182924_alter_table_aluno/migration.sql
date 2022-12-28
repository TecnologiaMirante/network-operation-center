/*
  Warnings:

  - Made the column `id_escola_user` on table `alunos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `alunos` DROP FOREIGN KEY `alunos_id_escola_user_fkey`;

-- AlterTable
ALTER TABLE `alunos` MODIFY `id_escola_user` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_id_escola_user_fkey` FOREIGN KEY (`id_escola_user`) REFERENCES `escola_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
