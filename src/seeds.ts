import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser(n: number): Promise<void> {
  for (let i = 0; i < n; i++) {
    await prisma.user.create({
      data: {
        username: 'Rich' + i,
            email: `hello${i}@prisma.com`,
            password: 'password',
        
      },
    })
  }
  console.log(`Created ${n} users`)
}

async function findAll(): Promise<{ users: User[]; count: number }> {
  const [users, count] = await prisma.$transaction([prisma.user.findMany(), prisma.user.count()])
  //   const [users, count] = await Promise.all([prisma.user.findMany(), prisma.user.count()])
  return {
    users,
    count,
  }
}

export { createUser, findAll }
