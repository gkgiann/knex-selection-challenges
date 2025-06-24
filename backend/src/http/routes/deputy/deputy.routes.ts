import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { prisma } from "../../../database/prisma";
import { DeputyServiceImplementation } from "../../../services/deputy/deputy.service.implementation";
import { DeputyRepositoryPrisma } from "../../../repositories/deputy/prisma/deputy.repository.prisma";
import { z } from "zod/v4";
import { ExpenseRepositoryPrisma } from "../../../repositories/expense/prisma/expense.repository.prisma";
import { ExpenseServiceImplementation } from "../../../services/expense/expense.service.implementation";
import { UFS } from "../../../types/constants";

export async function deputyRoutes(app: FastifyTypedInstance) {
  const querySchema = z.object({
    uf: z.enum(UFS, { message: "Invalid UF" }),
  });

  app.get(
    "/deputies",
    {
      schema: {
        tags: ["Deputado"],
        summary: "Lista deputados por UF",
        description:
          "Lista todos os deputados filtrados pela UF (sigla do estado)",
        querystring: querySchema,
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              nome: z.string(),
              uf: z.string(),
              cpf: z.string(),
              partido: z.string(),
            })
          ),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const parseResult = querySchema.safeParse(req.query);

      if (!parseResult.success) {
        return reply.status(400).send({
          message: parseResult.error.message,
        });
      }

      const { uf } = parseResult.data;

      const deputyRepository = DeputyRepositoryPrisma.build(prisma);
      const deputyService = new DeputyServiceImplementation(deputyRepository);

      const deputies = await deputyService.findByUf(uf);

      const formattedDeputies = deputies.map((d) => ({
        id: d.id,
        nome: d.nome,
        uf: d.uf as (typeof UFS)[number],
        cpf: d.cpf,
        partido: d.partido,
      }));

      return reply.send(formattedDeputies);
    }
  );

  app.get(
    "/deputies/:id/expenses",
    {
      schema: {
        tags: ["Despesa"],
        summary: "Lista despesas de um deputado",
        description: "Lista as despesas de um deputado pelo id",
        params: z.object({
          id: z.string().describe("ID do deputado"),
        }),
        response: {
          200: z.array(
            z.object({
              dataEmissao: z.string(),
              fornecedor: z.string(),
              valorLiquido: z.string(),
              urlDocumento: z.string().nullable(),
            })
          ),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };
      const deputyRepository = DeputyRepositoryPrisma.build(prisma);
      const deputyService = new DeputyServiceImplementation(deputyRepository);
      const expenseRepository = ExpenseRepositoryPrisma.build(prisma);
      const expenseService = new ExpenseServiceImplementation(
        expenseRepository
      );

      const deputy = await deputyService.findById(id);

      if (!deputy) {
        return reply.status(404).send({ message: "Deputy not found." });
      }

      const expenses = await expenseService.findExpensesByDeputyId(id);

      if (!expenses || expenses.length === 0) {
        return reply
          .status(404)
          .send({ message: "No expenses found for this deputy." });
      }

      const formattedExpenses = expenses.map((d) => ({
        dataEmissao: d.dataEmissao,
        fornecedor: d.fornecedor,
        valorLiquido: d.valorLiquido,
        urlDocumento: d.urlDocumento ?? null,
      }));

      return reply.send(formattedExpenses);
    }
  );
}
