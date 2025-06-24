import { Deputado } from "../../../generated/prisma_client";

export interface DeputadoService {
  save(deputado: Deputado): Promise<Deputado | null>;
}
