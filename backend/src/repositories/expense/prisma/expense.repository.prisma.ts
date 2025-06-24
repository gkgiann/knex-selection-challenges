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

  async findExpensesByDeputyId(deputyId: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({ where: { deputadoId: deputyId } });
  }
}
