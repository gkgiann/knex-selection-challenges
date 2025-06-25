import { Expense } from "../../../generated/prisma_client";

export interface ExpenseRepository {
  save(expense: Expense): Promise<Expense | null>;
  saveMany(expenses: Expense[]): Promise<Expense[]>;
  findExpensesByDeputyId(
    deputyId: string,
    perPage: number,
    skip: number
  ): Promise<{ expenses: Expense[]; total: number }>;
  getSumOfExpensesByDeputyId(deputyId: string): Promise<number>;
  getSumOfAllExpenses(): Promise<number>;
}
