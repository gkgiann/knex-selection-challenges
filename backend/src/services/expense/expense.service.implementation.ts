import { Expense } from "../../../generated/prisma_client";
import { ExpenseRepository } from "../../repositories/expense/expense.repository";
import { ExpenseService } from "./expense.service";

export class ExpenseServiceImplementation implements ExpenseService {
  constructor(private readonly repository: ExpenseRepository) {}

  static build(repository: ExpenseRepository) {
    return new ExpenseServiceImplementation(repository);
  }

  async save(expense: Expense): Promise<Expense | null> {
    return this.repository.save(expense);
  }

  async saveMany(expenses: Expense[]): Promise<Expense[]> {
    return this.repository.saveMany(expenses);
  }

  async findExpensesByDeputyId(deputyId: string) {
    return this.repository.findExpensesByDeputyId(deputyId);
  }

  async getSumOfExpensesByDeputyId(deputyId: string): Promise<number> {
    return this.repository.getSumOfExpensesByDeputyId(deputyId);
  }

  async getSumOfAllExpenses(): Promise<number> {
    return this.repository.getSumOfAllExpenses();
  }
}
