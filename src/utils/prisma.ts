import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Habilita logs útiles para desarrollo
});

// Middleware para transformar BigInt en string
prisma.$use(async (params, next) => {
  const result = await next(params);

  // Si el resultado es un array, mapea los elementos y transforma los BigInt
  if (Array.isArray(result)) {
    return result.map(item =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          typeof value === "bigint" ? value.toString() : value,
        ])
      )
    );
  }

  // Si el resultado no es un array, aplica la misma transformación
  if (result && typeof result === "object") {
    return Object.fromEntries(
      Object.entries(result).map(([key, value]) => [
        key,
        typeof value === "bigint" ? value.toString() : value,
      ])
    );
  }

  return result;
});

export default prisma;
