import { Deputado, Despesa } from "../../../../generated/prisma_client";
import { prisma } from "../../../database/prisma";
import { DeputadoRepositoryPrisma } from "../../../repositories/deputado/prisma/deputado.repository.prisma";
import { DeputadoServiceImplementation } from "../../../services/deputado/deputado.service.implementation";
import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { UFS } from "../../../types/constants";
import { DespesaRepositoryPrisma } from "../../../repositories/despesa/prisma/despesa.repository.prisma";
import { DespesaServiceImplementation } from "../../../services/despesa/despesa.service.implementation";
import { z } from "zod/v4";

export async function uploadRoutes(app: FastifyTypedInstance) {
  app.post(
    "/upload-csv",
    {
      schema: {
        tags: ["csv"],
        description:
          "Processa um arquivo CSV com os dados de despesas e deputados. Deve-se enviar um arquivo CSV (multipart/form-data).",
        summary: "Upload do arquivo CSV",

        response: {
          200: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      try {
        const deputadoRepository = DeputadoRepositoryPrisma.build(prisma);
        const deputadoService = new DeputadoServiceImplementation(
          deputadoRepository
        );
        const despesaRepository = DespesaRepositoryPrisma.build(prisma);
        const despesaService = new DespesaServiceImplementation(
          despesaRepository
        );

        const csvFile = await req.file();

        if (!csvFile || csvFile.mimetype !== "text/csv") {
          return reply.status(400).send({ message: "Arquivo CSV inválido." });
        }

        const results: any[] = [];

        const fileBuffer = await csvFile.toBuffer();
        const csvText = fileBuffer.toString("utf-8");
        const lines = csvText.split(/\r?\n/).filter(Boolean);
        const headers = lines[0].split(";");

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(";");
          const row: Record<string, string> = {};
          headers.forEach((header, idx) => {
            row[header] = values[idx] ?? "";
          });

          // ajeitando as chaves e valores
          const cleanedRow: Record<string, string> = {};
          Object.entries(row).forEach(([key, value]) => {
            const cleanKey = key.replace(/^['"\s]+|['"\s]+$/g, "");
            const cleanValue = value.replace(/^['"\s]+|['"\s]+$/g, "");

            cleanedRow[cleanKey] = cleanValue;
          });
          results.push(cleanedRow);
        }

        const resultsFiltered = results.filter((row) => UFS.includes(row.sgUF));

        const deputados: Deputado[] = [];
        const despesas: Despesa[] = [];

        for (const row of resultsFiltered) {
          const deputado = {
            id: row.ideCadastro,
            nome: row.txNomeParlamentar,
            uf: row.sgUF,
            cpf: row.cpf,
            partido: row.sgPartido,
          };

          if (!deputados.some((d) => d.id === deputado.id)) {
            deputados.push(deputado);
          }

          const despesa = {
            id: row.ideDocumento,
            dataEmissao: row.datEmissao,
            fornecedor: row.txtFornecedor,
            valorLiquido: row.vlrLiquido,
            urlDocumento: row.urlDocumento,
            deputadoId: deputado.id,
          };

          despesas.push(despesa);
        }

        // console.log("despesas: ", despesas.length);
        // console.log("deputados: ", deputados.length);

        await deputadoService.saveMany(deputados);
        await despesaService.saveMany(despesas);

        return reply.send({ message: "Arquivo CSV processado com sucesso!" });
      } catch (error) {
        console.error("Erro ao processar CSV:", error);
        return reply.status(500).send({
          message: "Erro interno ao processar o arquivo CSV.",
        });
      }
    }
  );
}
