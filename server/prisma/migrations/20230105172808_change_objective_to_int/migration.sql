/*
  Warnings:

  - You are about to alter the column `objective` on the `conquistas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `objective_secondary` on the `conquistas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `conquistas` MODIFY `objective` INTEGER NOT NULL,
    MODIFY `objective_secondary` INTEGER NULL;
