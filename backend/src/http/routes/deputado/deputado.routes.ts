import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { prisma } from "../../../database/prisma";
import { DeputadoServiceImplementation } from "../../../services/deputado/deputado.service.implementation";
import { DeputadoRepositoryPrisma } from "../../../repositories/deputado/prisma/deputado.repository.prisma";
import { z } from "zod/v4";
import { UFS } from "../../../types/constants";

export async function deputadoRoutes(app: FastifyTypedInstance) {
  const querySchema = z.object({
    uf: z.enum(UFS, { message: "UF inválido" }),
  });

  app.get(
    "/deputados",
    {
      schema: {
        tags: ["deputados"],
        description:
          "Lista todos os deputados filtrando por UF (Unidade Federativa)",
        querystring: querySchema,
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              nome: z.string(),
              uf: z.enum(UFS),
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
      const deputadoRepository = DeputadoRepositoryPrisma.build(prisma);
      const deputadoService = new DeputadoServiceImplementation(
        deputadoRepository
      );
      const deputados = await deputadoService.findByUf(uf);
      // Garante que o campo uf seja do tipo correto para o schema de resposta
      const deputadosTyped = deputados.map((dep) => ({
        ...dep,
        uf: dep.uf as (typeof UFS)[number],
      }));
      return reply.send(deputadosTyped);
    }
  );
}
