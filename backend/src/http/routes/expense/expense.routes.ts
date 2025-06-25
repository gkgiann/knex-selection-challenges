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
        querystring: z.object({
          page: z.coerce.number().int().min(1).default(1),
          perPage: z.coerce.number().int().min(1).max(100).default(10),
        }),
        response: {
          200: z.object({
            expenses: z.array(
              z.object({
                issueDate: z.string(),
                supplier: z.string(),
                netValue: z.number(),
                documentUrl: z.string().nullable(),
              })
            ),
            meta: z.object({
              current: z.number(),
              path: z.string(),
              prev: z.number().nullable(),
              next: z.number().nullable(),
              last: z.number(),
              total: z.number(),
            }),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };
      const { page = 1, perPage = 10 } = req.query as {
        page?: number;
        perPage?: number;
      };
      const skip = (page - 1) * perPage;

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

      const { expenses, total } = await expenseService.findExpensesByDeputyId(
        id,
        perPage,
        skip
      );

      const last = Math.ceil(total / perPage);

      const meta = {
        current: page,
        path: `/deputies/${id}/expenses`,
        prev: page > 1 ? page - 1 : null,
        next: page < last ? page + 1 : null,
        last,
        total,
      };

      return reply.send({ expenses, meta });
    }
  );
}
