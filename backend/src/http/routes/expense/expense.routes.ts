import { z } from "zod/v4";
import { prisma } from "../../../database/prisma";
import { DeputyRepositoryPrisma } from "../../../repositories/deputy/prisma/deputy.repository.prisma";
import { DeputyServiceImplementation } from "../../../services/deputy/deputy.service.implementation";
import { ExpenseRepositoryPrisma } from "../../../repositories/expense/prisma/expense.repository.prisma";
import { ExpenseServiceImplementation } from "../../../services/expense/expense.service.implementation";
import { FastifyTypedInstance } from "../../../types/fastify-instance";

export async function expenseRoutes(app: FastifyTypedInstance) {
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
              valorLiquido: z.number(),
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
