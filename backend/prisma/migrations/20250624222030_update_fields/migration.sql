/*
  Warnings:

  - You are about to drop the `Deputado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Despesa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Despesa" DROP CONSTRAINT "Despesa_deputadoId_fkey";

-- DropTable
DROP TABLE "Deputado";

-- DropTable
DROP TABLE "Despesa";

-- CreateTable
CREATE TABLE "Deputy" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "partido" TEXT NOT NULL,

    CONSTRAINT "Deputy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "dataEmissao" TEXT NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "valorLiquido" TEXT NOT NULL,
    "urlDocumento" TEXT,
    "deputadoId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deputy_cpf_key" ON "Deputy"("cpf");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_deputadoId_fkey" FOREIGN KEY ("deputadoId") REFERENCES "Deputy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
