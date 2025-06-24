import { z } from "zod/v4";
import { DeputyRepository } from "../../repositories/deputy/deputy.repository";
import { DeputyService } from "./deputy.service";
import { Deputy } from "../../../generated/prisma_client";

const DeputySchema = z.object({
  id: z.string().min(1, "id é obrigatório"),
  nome: z.string().min(1, "nome é obrigatório"),
  uf: z.string().min(2).max(2),
  cpf: z.string().optional(),
  partido: z.string().optional(),
});

export class DeputyServiceImplementation implements DeputyService {
  constructor(private readonly repository: DeputyRepository) {}

  static build(repository: DeputyRepository) {
    return new DeputyServiceImplementation(repository);
  }

  async save(deputy: Deputy): Promise<Deputy | null> {
    this.validateDeputy(deputy);
    return this.repository.save(deputy);
  }

  async saveMany(deputies: Deputy[]): Promise<Deputy[]> {
    deputies.forEach(this.validateDeputy);
    return this.repository.saveMany(deputies);
  }

  async findByUf(uf: string): Promise<Deputy[]> {
    return this.repository.findByUf(uf);
  }

  async findById(id: string): Promise<Deputy | null> {
    return this.repository.findById(id);
  }

  private validateDeputy(deputy: Deputy) {
    DeputySchema.parse(deputy);
  }
}
