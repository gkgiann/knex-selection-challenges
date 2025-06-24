import { Deputy } from "../../../generated/prisma_client";

export interface DeputyService {
  save(deputy: Deputy): Promise<Deputy | null>;
  saveMany(deputies: Deputy[]): Promise<Deputy[]>;
  findByUf(uf: string): Promise<Deputy[]>;
  findById(id: string): Promise<Deputy | null>;
}
