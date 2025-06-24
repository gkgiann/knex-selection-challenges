import { Deputado, Despesa } from "../../../../generated/prisma_client";
import { prisma } from "../../../database/prisma";
import { DeputadoRepositoryPrisma } from "../../../repositories/deputado/prisma/deputado.repository.prisma";
import { DeputadoServiceImplementation } from "../../../services/deputado/deputado.service.implementation";
import { FastifyTypedInstance } from "../../../types/fastify-instance";
import { UFS } from "../../../types/constants";

export async function uploadRoutes(app: FastifyTypedInstance) {
  app.post(
    "/upload-csv",
    {
      schema: {
        tags: ["csv"],
        description:
          "Processa um arquivo CSV com os dados de despesas e deputados. Deve-se enviar um arquivo CSV.",
      },
    },
    async (req, reply) => {
      try {
        const csvFile = await req.file();

        if (!csvFile || csvFile.mimetype !== "text/csv") {
          return reply.status(400).send({ error: "Arquivo CSV inválido." });
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

        const deputadoRepository = DeputadoRepositoryPrisma.build(prisma);
        const deputadoService = new DeputadoServiceImplementation(
          deputadoRepository
        );

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

        await prisma.despesa.createMany({
          data: despesas,
          skipDuplicates: true,
        });

        return reply.send({ message: "Arquivo CSV processado com sucesso!" });
      } catch (error) {
        console.error("Erro ao processar CSV:", error);
        return reply.status(500).send({
          error: "Erro interno ao processar o arquivo CSV.",
          details: error instanceof Error ? error.message : String(error),
        });
      }
    }
  );
}

//   txNomeParlamentar: 'Fausto Pinato',
//   cpf: '28022995819',
//   ideCadastro: '66828',
//   nuCarteiraParlamentar: '355',
//   nuLegislatura: '2023',
//   sgUF: 'SP',
//   sgPartido: 'PP',
//   codLegislatura: '57',
//   numSubCota: '3',
//   txtDescricao: 'COMBUSTÍVEIS E LUBRIFICANTES.',
//   numEspecificacaoSubCota: '1',
//   txtDescricaoEspecificacao: 'Veículos Automotores',
//   txtFornecedor: 'C M AUTO POSTO LT',
//   txtCNPJCPF: '455.427.680/0012-5',
//   txtNumero: '095640',
//   indTipoDocumento: '0',
//   datEmissao: '2025-02-20T00:00:00',
//   vlrDocumento: '150',
//   vlrGlosa: '0',
//   vlrLiquido: '150',
//   numMes: '2',
//   numAno: '2025',
//   numParcela: '0',
//   txtPassageiro: '',
//   txtTrecho: '',
//   numLote: '2113916',
//   numRessarcimento: '',
//   datPagamentoRestituicao: '',
//   vlrRestituicao: '',
//   nuDeputadoId: '2917',
//   ideDocumento: '7875421',
//   urlDocumento: 'https://www.camara.leg.br/cota-parlamentar/documentos/publ/2917/2025/7875421.pdf'
