const { PrismaClient } = require("@prisma/client")

class UserManager {
  constructor(prisma) {
    this.prisma = prisma
  }

  async findUnique(id) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email) {
    return this.prisma.user.findFirst({
      where: { email },
    })
  }

  async findByName(name) {
    return this.prisma.user.findFirst({
      where: { name },
    })
  }

  async findByEmailOrName(email, name) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    })
  }

  async findMany() {
    return this.prisma.user.findMany()
  }

  async create(data) {
    return this.prisma.user.create({
      data,
    })
  }

  async update(id, data) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id) {
    return this.prisma.user.delete({
      where: { id },
    })
  }

  async upsert(id, data) {
    return this.prisma.user.upsert({
      where: { id },
      update: data,
      create: data,
    })
  }
}

// Uso de la clase UserManager con Prisma
const prisma = new PrismaClient()
const userManager = new UserManager(prisma)

// Ejemplo de uso
async function exampleUsage() {
  const user = await userManager.create({
    email: "example@example.com",
    name: "John Doe",
    password: "securePassword",
  })

  console.log("Created User:", user)

  const updatedUser = await userManager.update(user.id, {
    name: "Updated Name",
  })

  console.log("Updated User:", updatedUser)

  const allUsers = await userManager.findMany()
  console.log("All Users:", allUsers)

  const foundUser = await userManager.findUnique(user.id)
  console.log("Found User:", foundUser)

  const userByEmail = await userManager.findByEmail("example@example.com")
  console.log("User found by email:", userByEmail)

  const userByName = await userManager.findByName("John Doe")
  console.log("User found by name:", userByName)

  const userByEmailOrName = await userManager.findByEmailOrName(
    "example@example.com",
    "John Doe"
  )
  console.log("User found by email or name:", userByEmailOrName)

  await userManager.delete(user.id)
  console.log("User Deleted")

  const upsertedUser = await userManager.upsert(1, {
    email: "upserted@example.com",
    name: "Upserted User",
    password: "upsertedPassword",
  })
  console.log("Upserted User:", upsertedUser)
}

// Llama a la función de ejemplo
exampleUsage()
