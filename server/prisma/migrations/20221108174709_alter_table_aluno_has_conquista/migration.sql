/*
  Warnings:

  - Added the required column `progress` to the `Aluno_has_conquista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aluno_has_conquista` ADD COLUMN `progress` INTEGER NOT NULL;
