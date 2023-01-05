/*
  Warnings:

  - The values [especifico,geral] on the enum `conquistas_domain` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `conquistas` MODIFY `domain` ENUM('specific', 'general') NOT NULL;
