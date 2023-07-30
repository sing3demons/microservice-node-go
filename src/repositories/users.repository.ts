// import { PrismaClient, User } from '@prisma/client'
import PrismaClient, { User } from '../connect'
import { RequestQuery, UsersResponse } from '../dto/users'
const { prisma } = new PrismaClient()

class UsersRepository {
  private readonly users = prisma.user

  private findAllAndCount = async ({
    skip,
    size
  }: RequestQuery): Promise<UsersResponse> => {
    try {
      const [users, total] = await prisma.$transaction([
        this.users.findMany({ take: size, skip }),
        this.users.count()
      ])

      return {
        users,
        total
      } as UsersResponse
    } catch (error) {
      const users = await this.users.findMany({ take: size, skip })
      const total = await this.users.count()
      return {
        users,
        total
      } as UsersResponse
    }
  }

  public findAll = async ({ skip, size }: RequestQuery) => {
    try {
      // const { users, total }: UsersResponse = await this.findAllAndCount({ skip, size })
      const [users, total] = await Promise.all([
        this.users.findMany({ take: size, skip }),
        this.users.count()
      ])
      // const users = await this.users.findMany({})
      // const total = await this.users.count()
      return {
        users,
        total
      }
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }

  public findById = async (id: string) => {
    try {
      return await this.users.findUnique({ where: { id } })
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }

  public findUserByEmail = async (email: string) => {
    try {
      return await this.users.findUnique({ where: { email } })
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }

  public createUser = async (data: User) => {
    try {
      return await this.users.create({ data })
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }

  public updateUser = async (
    id: string,
    data: User
  ): Promise<User | undefined> => {
    try {
      return await this.users.update({
        where: { id },
        data: data
      })
    } catch (e) {
      if (e instanceof Error) {
        console.error(e)
        throw new Error(e.message)
      }
    }
  }

  public deleteUser = async (id: string): Promise<User | undefined> => {
    try {
      return await this.users.delete({
        where: { id }
      })
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }
}

export default UsersRepository
