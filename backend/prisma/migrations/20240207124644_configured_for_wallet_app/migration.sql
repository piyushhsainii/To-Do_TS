/*
  Warnings:

  - You are about to drop the column `Done` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `account` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "Done",
DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "balance" TEXT NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "account"("userId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
