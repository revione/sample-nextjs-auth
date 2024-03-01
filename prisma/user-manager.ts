import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

class UserManager {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  constructor(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
    this.prisma = prisma
  }

  async findUnique(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    })
  }

  async findByName(name: string) {
    return this.prisma.user.findFirst({
      where: { name },
    })
  }

  async findByEmailOrName(email: string, name: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    })
  }

  async findMany() {
    return this.prisma.user.findMany()
  }

  async create(data: { email: string; name: string; password: string }) {
    return this.prisma.user.create({
      data,
    })
  }

  async update(id: string, data: { name?: string; password?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }

  async upsert(
    id: string,
    data: { email: string; name: string; password: string }
  ) {
    return this.prisma.user.upsert({
      where: { id },
      update: data,
      create: data,
    })
  }
}

// Uso de la clase UserManager con Prisma
// const prisma = new PrismaClient();
// const userManager = new UserManager(prisma);

export const userManager = new UserManager(new PrismaClient())
