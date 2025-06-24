import { Despesa } from "../../../generated/prisma_client";

export interface DespesaRepository {
  save(despesa: Despesa): Promise<Despesa | null>;
  saveMany(despesas: Despesa[]): Promise<Despesa[]>;
}
