import { PrismaClient } from "@prisma/client";

// Conexão com o Banco de dados
export const prisma = new PrismaClient({ log: ["query"] });
