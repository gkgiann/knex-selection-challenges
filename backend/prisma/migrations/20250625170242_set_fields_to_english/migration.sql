/*
  Warnings:

  - You are about to drop the column `nome` on the `Deputy` table. All the data in the column will be lost.
  - You are about to drop the column `partido` on the `Deputy` table. All the data in the column will be lost.
  - You are about to drop the column `dataEmissao` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `deputadoId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedor` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `urlDocumento` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `valorLiquido` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `name` to the `Deputy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party` to the `Deputy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deputyId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDate` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netValue` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_deputadoId_fkey";

-- AlterTable
ALTER TABLE "Deputy" DROP COLUMN "nome",
DROP COLUMN "partido",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "party" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "dataEmissao",
DROP COLUMN "deputadoId",
DROP COLUMN "fornecedor",
DROP COLUMN "urlDocumento",
DROP COLUMN "valorLiquido",
ADD COLUMN     "deputyId" TEXT NOT NULL,
ADD COLUMN     "documentUrl" TEXT,
ADD COLUMN     "issueDate" TEXT NOT NULL,
ADD COLUMN     "netValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "supplier" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_deputyId_fkey" FOREIGN KEY ("deputyId") REFERENCES "Deputy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
