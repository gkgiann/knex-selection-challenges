import { z } from "zod/v4";
import { prisma } from "../../../database/prisma";
import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { ExpenseRepositoryPrisma } from "../../../repositories/expense/prisma/expense.repository.prisma";
import { ExpenseServiceImplementation } from "../../../services/expense/expense.service.implementation";
import { DeputyRepositoryPrisma } from "../../../repositories/deputy/prisma/deputy.repository.prisma";
import { DeputyServiceImplementation } from "../../../services/deputy/deputy.service.implementation";

export async function reportRoutes(app: FastifyTypedInstance) {
  app.get(
    "/reports/deputies/:id/total-expenses",
    {
      schema: {
        tags: ["Relatórios"],
        summary: "Obter despesas totais de um deputado",
        description:
          "Retorna a soma de todas as despesas do deputado especificado.",
        params: z.object({
          id: z.string().describe("ID do deputado"),
        }),
        response: {
          200: z.object({
            deputyId: z.string(),
            totalExpenses: z.string(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };

      const deputyRepository = DeputyRepositoryPrisma.build(prisma);
      const deputyService = new DeputyServiceImplementation(deputyRepository);

      const deputy = await deputyService.findById(id);

      if (!deputy) {
        return reply.status(404).send({ message: "Deputy not found." });
      }

      const expenseRepository = ExpenseRepositoryPrisma.build(prisma);
      const expenseService = new ExpenseServiceImplementation(
        expenseRepository
      );

      const totalSumExpenses = await expenseService.getSumOfExpensesByDeputyId(
        id
      );

      return reply.send({
        deputyId: id,
        totalExpenses: totalSumExpenses,
      });
    }
  );
}
