import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { prisma } from "../../../database/prisma";
import { DeputadoServiceImplementation } from "../../../services/deputado/deputado.service.implementation";
import { DeputadoRepositoryPrisma } from "../../../repositories/deputado/prisma/deputado.repository.prisma";
import { z } from "zod/v4";
import { UFS } from "../../../types/constants";
import { DespesaRepositoryPrisma } from "../../../repositories/despesa/prisma/despesa.repository.prisma";
import { DespesaServiceImplementation } from "../../../services/despesa/despesa.service.implementation";

export async function deputadoRoutes(app: FastifyTypedInstance) {
  const querySchema = z.object({
    uf: z.enum(UFS, { message: "UF inválido" }),
  });

  app.get(
    "/deputados",
    {
      schema: {
        tags: ["deputados"],
        summary: "Lista deputados por UF",
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

      const deputadosTyped = deputados.map((dep) => ({
        ...dep,
        uf: dep.uf as (typeof UFS)[number],
      }));

      return reply.send(deputadosTyped);
    }
  );

  app.get(
    "/deputados/:id/despesas",
    {
      schema: {
        tags: ["deputados"],
        summary: "Lista despesas de um deputado",
        description: "Lista as despesas de um deputado pelo id",
        params: z.object({
          id: z.string().describe("ID do deputado"),
        }),
        response: {
          200: z.array(
            z.object({
              dataEmissao: z.string(),
              txtFornecedor: z.string(),
              vlrLiquido: z.string(),
              urlDocumento: z.string().nullable(),
            })
          ),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };
      const deputadoRepository = DeputadoRepositoryPrisma.build(prisma);
      const deputadoService = new DeputadoServiceImplementation(
        deputadoRepository
      );
      const despesaRepository = DespesaRepositoryPrisma.build(prisma);
      const despesaService = new DespesaServiceImplementation(
        despesaRepository
      );

      const deputado = await deputadoService.findById(id);

      if (!deputado) {
        return reply.status(404).send({ message: "Deputado não encontrado." });
      }

      const despesas = await despesaService.findDespesasByDeputadoId(id);

      if (!despesas || despesas.length === 0) {
        return reply
          .status(404)
          .send({ message: "Nenhuma despesa encontrada para este deputado." });
      }

      const despesasFormatadas = despesas.map((d) => ({
        dataEmissao: d.dataEmissao,
        txtFornecedor: d.fornecedor,
        vlrLiquido: d.valorLiquido,
        urlDocumento: d.urlDocumento ?? null,
      }));

      return reply.send(despesasFormatadas);
    }
  );
}
