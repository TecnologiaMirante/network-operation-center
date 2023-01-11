/*
  Warnings:

  - You are about to drop the column `description` on the `lembretes` table. All the data in the column will be lost.
  - You are about to drop the column `id_aluno` on the `lembretes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `lembretes` DROP FOREIGN KEY `lembretes_id_aluno_fkey`;

-- AlterTable
ALTER TABLE `lembretes` DROP COLUMN `description`,
    DROP COLUMN `id_aluno`;
