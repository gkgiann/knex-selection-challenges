import { FastifyTypedInstance } from "../../../types/fastify-instance";

import { Expense, Deputy } from "../../../../generated/prisma_client";

import { prisma } from "../../../database/prisma";

import { z } from "zod/v4";

import { UFS } from "../../../types/constants";

import { DeputyRepositoryPrisma } from "../../../repositories/deputy/implementations/deputy.repository.prisma";
import { DeputyServiceImplementation } from "../../../services/deputy/deputy.service.implementation";

import { ExpenseRepositoryPrisma } from "../../../repositories/expense/implementations/expense.repository.prisma";
import { ExpenseServiceImplementation } from "../../../services/expense/expense.service.implementation";

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
        const deputyRepository = DeputyRepositoryPrisma.build(prisma);
        const deputyService = new DeputyServiceImplementation(deputyRepository);
        const expenseRepository = ExpenseRepositoryPrisma.build(prisma);
        const expenseService = new ExpenseServiceImplementation(
          expenseRepository
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

        const deputies: Deputy[] = [];
        const expenses: Expense[] = [];

        for (const row of resultsFiltered) {
          const deputy = {
            id: row.ideCadastro,
            name: row.txNomeParlamentar,
            uf: row.sgUF,
            cpf: row.cpf,
            party: row.sgPartido,
          };

          if (!deputies.some((d) => d.id === deputy.id)) {
            deputies.push(deputy);
          }

          const expense = {
            id: row.ideDocumento,
            issueDate: row.datEmissao,
            supplier: row.txtFornecedor,
            netValue: parseFloat(row.vlrLiquido ?? 0),
            documentUrl: row.urlDocumento,
            deputyId: deputy.id,
          };

          expenses.push(expense);
        }

        // console.log("expenses: ", expenses.length);
        // console.log("deputados: ", deputados.length);

        await deputyService.saveMany(deputies);
        await expenseService.saveMany(expenses);

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
