import { Deputado } from "../../../generated/prisma_client";

export interface DeputadoRepository {
  save(deputado: Deputado): Promise<Deputado | null>;
  saveMany(deputados: Deputado[]): Promise<Deputado[]>;
  findByUf(uf: string): Promise<Deputado[]>;
}
