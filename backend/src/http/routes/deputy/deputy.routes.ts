import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { prisma } from "../../../database/prisma";
import { DeputyServiceImplementation } from "../../../services/deputy/deputy.service.implementation";
import { DeputyRepositoryPrisma } from "../../../repositories/deputy/prisma/deputy.repository.prisma";
import { z } from "zod/v4";
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
}
