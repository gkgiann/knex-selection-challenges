import { Despesa, PrismaClient } from "../../../../generated/prisma_client";
import { DespesaRepository } from "../despesa.repository";

export class DespesaRepositoryPrisma implements DespesaRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new DespesaRepositoryPrisma(prisma);
  }

  async save(despesa: Despesa): Promise<Despesa | null> {
    const result = await this.prisma.despesa.create({
      data: despesa,
    });
    return result;
  }

  async saveMany(despesas: Despesa[]): Promise<Despesa[]> {
    await this.prisma.despesa.createMany({
      data: despesas,
      skipDuplicates: true,
    });
    return despesas;
  }

  async findDespesasByDeputadoId(deputadoId: string): Promise<Despesa[]> {
    return this.prisma.despesa.findMany({ where: { deputadoId } });
  }
}
