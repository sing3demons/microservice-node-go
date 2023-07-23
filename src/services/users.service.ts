import { RequestQuery, User, UsersResponse } from '../dto/users'
import UsersRepository from '../repositories/users.repository'

class UsersService {
  private users = new UsersRepository()

  public getUsers = async (query: RequestQuery): Promise<UsersResponse> => {
    try {
      const { size, skip } = query

      return await this.users.findAll({ skip: Number(skip) | 0, size: Number(size) | 10 })
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public getUserById = async (id: string): Promise<User | null> => {
    try {
      return await this.users.findById(id)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public createUser = async (data: User): Promise<User> => {
    try {
      const user = await this.users.createUser(data)
      return user
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public updateUser = async (id: string, data: User): Promise<User> => {
    try {
      return await this.users.updateUser(id, data)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  public deleteUser = async (id: string): Promise<User> => {
    try {
      return await this.users.deleteUser(id)
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default UsersService
