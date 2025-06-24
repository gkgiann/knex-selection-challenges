import { z } from "zod/v4";
import { Deputado } from "../../../generated/prisma_client";
import { DeputadoRepository } from "../../repositories/deputado/deputado.repository";
import { DeputadoService } from "./deputado.service";

const DeputadoSchema = z.object({
  id: z.string().min(1, "id é obrigatório"),
  nome: z.string().min(1, "nome é obrigatório"),
  uf: z.string().min(2).max(2),
  cpf: z.string().optional(),
  partido: z.string().optional(),
});

export class DeputadoServiceImplementation implements DeputadoService {
  constructor(private readonly repository: DeputadoRepository) {}

  static build(repository: DeputadoRepository) {
    return new DeputadoServiceImplementation(repository);
  }

  async save(deputado: Deputado): Promise<Deputado | null> {
    this.validateDeputado(deputado);
    return this.repository.save(deputado);
  }

  async saveMany(deputados: Deputado[]): Promise<Deputado[]> {
    deputados.forEach(this.validateDeputado);
    return this.repository.saveMany(deputados);
  }

  async findByUf(uf: string): Promise<Deputado[]> {
    return this.repository.findByUf(uf);
  }

  async findById(id: string): Promise<Deputado | null> {
    return this.repository.findById(id);
  }

  private validateDeputado(deputado: Deputado) {
    DeputadoSchema.parse(deputado);
  }
}
