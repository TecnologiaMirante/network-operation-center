-- AlterTable
ALTER TABLE `aluno_has_conquista` ADD COLUMN `current` INTEGER NULL DEFAULT 0,
    MODIFY `progress` INTEGER NULL DEFAULT 0;
