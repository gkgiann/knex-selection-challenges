import { Deputado, PrismaClient } from "../../../../generated/prisma_client";
import { DeputadoRepository } from "../deputado.repository";

export class DeputadoRepositoryPrisma implements DeputadoRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new DeputadoRepositoryPrisma(prisma);
  }

  async save(deputado: Deputado): Promise<Deputado | null> {
    const result = await this.prisma.deputado.create({
      data: deputado,
    });

    return result;
  }

  async saveMany(deputados: Deputado[]): Promise<Deputado[]> {
    await this.prisma.deputado.createMany({
      data: deputados,
      skipDuplicates: true,
    });
    return deputados;
  }

  async findByUf(uf: string): Promise<Deputado[]> {
    return this.prisma.deputado.findMany({ where: { uf } });
  }
}
