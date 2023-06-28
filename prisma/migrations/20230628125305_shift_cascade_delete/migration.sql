-- DropForeignKey
ALTER TABLE `Shift` DROP FOREIGN KEY `Shift_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Shift` ADD CONSTRAINT `Shift_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
