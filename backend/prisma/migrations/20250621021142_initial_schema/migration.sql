-- CreateTable
CREATE TABLE "Deputado" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "partido" TEXT NOT NULL,

    CONSTRAINT "Deputado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "valorLiquido" DOUBLE PRECISION NOT NULL,
    "urlDocumento" TEXT,
    "deputadoId" TEXT NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deputado_cpf_key" ON "Deputado"("cpf");

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_deputadoId_fkey" FOREIGN KEY ("deputadoId") REFERENCES "Deputado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
