-- CreateTable
CREATE TABLE `messages_professores` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_room` VARCHAR(191) NOT NULL,
    `id_professor` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messages_professores` ADD CONSTRAINT `messages_professores_id_professor_fkey` FOREIGN KEY (`id_professor`) REFERENCES `professores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages_professores` ADD CONSTRAINT `messages_professores_id_room_fkey` FOREIGN KEY (`id_room`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
