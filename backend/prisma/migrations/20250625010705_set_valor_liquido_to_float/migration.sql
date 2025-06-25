/*
  Warnings:

  - Changed the type of `valorLiquido` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "valorLiquido",
ADD COLUMN     "valorLiquido" DOUBLE PRECISION NOT NULL;
