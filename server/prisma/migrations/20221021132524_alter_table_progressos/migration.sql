/*
  Warnings:

  - Added the required column `progress` to the `progressos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progressos` ADD COLUMN `progress` INTEGER NOT NULL;
