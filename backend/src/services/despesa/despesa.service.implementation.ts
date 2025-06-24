import { Despesa } from "../../../generated/prisma_client";
import { DespesaRepository } from "../../repositories/despesa/despesa.repository";
import { DespesaService } from "./despesa.service";

export class DespesaServiceImplementation implements DespesaService {
  constructor(private readonly repository: DespesaRepository) {}

  static build(repository: DespesaRepository) {
    return new DespesaServiceImplementation(repository);
  }

  async save(despesa: Despesa): Promise<Despesa | null> {
    return this.repository.save(despesa);
  }

  async saveMany(despesas: Despesa[]): Promise<Despesa[]> {
    return this.repository.saveMany(despesas);
  }
}
