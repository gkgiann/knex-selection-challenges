import { Deputado } from "../../generated/prisma_client";
import { DeputadoRepository } from "../repositories/deputado/deputado.repository";

export class DeputadoService {
  constructor(private readonly repository: DeputadoRepository) {}

  /**
   * Salva um deputado após validação de dados.
   */
  async save(deputado: Deputado): Promise<Deputado | null> {
    this.validateDeputado(deputado);
    return this.repository.save(deputado);
  }

  /**
   * Validação simples de campos obrigatórios.
   */
  private validateDeputado(deputado: Deputado) {
    if (!deputado.id || !deputado.nome || !deputado.uf) {
      throw new Error("Deputado inválido: id, nome e uf são obrigatórios.");
    }
    // Adicione outras validações conforme necessário
  }
}
