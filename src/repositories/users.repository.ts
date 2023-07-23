// import { PrismaClient, User } from '@prisma/client'
import PrismaClient, { User } from '../connect'
import { RequestQuery, UsersResponse } from '../dto/users'
const $prisma = PrismaClient

class UsersRepository {
  public users = $prisma.user

  private findAllAndCount = async ({ skip, size }: RequestQuery): Promise<UsersResponse> => {
    try {
      const [users, total] = await $prisma.$transaction([this.users.findMany({ take: size, skip }), this.users.count()])

      return {
        users,
        total,
      } as UsersResponse
    } catch (error) {
      const users = await this.users.findMany({ take: size, skip })
      const total = await this.users.count()
      return {
        users,
        total,
      } as UsersResponse
    }
  }

  public findAll = async ({ skip, size }: RequestQuery): Promise<UsersResponse> => {
    try {
      // const { users, total }: UsersResponse = await this.findAllAndCount({ skip, size })
      const [users, total] = await Promise.all([this.users.findMany({ take: size, skip }), this.users.count()])
      // const users = await this.users.findMany({})
      // const total = await this.users.count()
      return {
        users,
        total,
      }
    } catch (e: any) {
      console.error(e)
      throw new Error(e)
    }
  }

  public findById = async (id: string): Promise<User | null> => {
    try {
      return await this.users.findUnique({ where: { id } })
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public findUserByEmail = async (email: string): Promise<User | null> => {
    try {
      return await this.users.findUnique({ where: { email } })
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public createUser = async (data: User): Promise<User> => {
    try {
      return await this.users.create({ data })
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public updateUser = async (id: string, data: User): Promise<User> => {
    try {
      return await this.users.update({ where: { id }, data })
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public deleteUser = async (id: string): Promise<User> => {
    try {
      return await this.users.delete({
        where: {
          id,
        },
      })
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default UsersRepository
