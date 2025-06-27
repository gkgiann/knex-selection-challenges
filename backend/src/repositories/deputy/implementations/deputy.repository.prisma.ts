import { Deputy, PrismaClient } from "../../../../generated/prisma_client";
import { DeputyRepository } from "../deputy.repository";

export class DeputyRepositoryPrisma implements DeputyRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new DeputyRepositoryPrisma(prisma);
  }

  async save(deputy: Deputy): Promise<Deputy | null> {
    const result = await this.prisma.deputy.create({
      data: deputy,
    });

    return result;
  }

  async saveMany(deputies: Deputy[]): Promise<Deputy[]> {
    await this.prisma.deputy.createMany({
      data: deputies,
      skipDuplicates: true,
    });
    return deputies;
  }

  async findByUf(uf: string): Promise<Deputy[]> {
    return this.prisma.deputy.findMany({ where: { uf } });
  }

  async findById(id: string): Promise<Deputy | null> {
    return this.prisma.deputy.findUnique({ where: { id } });
  }
}
