import { Expense, PrismaClient } from "../../../../generated/prisma_client";
import { ExpenseRepository } from "../expense.repository";

export class ExpenseRepositoryPrisma implements ExpenseRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new ExpenseRepositoryPrisma(prisma);
  }

  async save(expense: Expense): Promise<Expense | null> {
    const result = await this.prisma.expense.create({
      data: expense,
    });
    return result;
  }

  async saveMany(expenses: Expense[]): Promise<Expense[]> {
    await this.prisma.expense.createMany({
      data: expenses,
      skipDuplicates: true,
    });
    return expenses;
  }

  async findExpensesByDeputyId(
    deputyId: string,
    perPage: number,
    skip: number
  ): Promise<{ expenses: Expense[]; total: number }> {
    const [expenses, total] = await this.prisma.$transaction([
      this.prisma.expense.findMany({
        where: { deputadoId: deputyId },
        take: perPage,
        skip,
      }),
      this.prisma.expense.count({ where: { deputadoId: deputyId } }),
    ]);

    return { expenses, total };
  }

  async getSumOfExpensesByDeputyId(deputyId: string): Promise<number> {
    const result = await this.prisma.expense.aggregate({
      where: { deputadoId: deputyId },
      _sum: { valorLiquido: true },
    });

    return Number((result._sum.valorLiquido ?? 0).toFixed(2));
  }

  async getSumOfAllExpenses(): Promise<number> {
    const result = await this.prisma.expense.aggregate({
      _sum: { valorLiquido: true },
    });

    return Number((result._sum.valorLiquido ?? 0).toFixed(2));
  }
}
