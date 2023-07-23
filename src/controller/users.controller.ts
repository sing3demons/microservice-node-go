import { Request, Response } from 'express'
import UsersService from '../services/users.service'

import { RequestQuery, User, UserRequest, UsersResponse } from '../dto/users'
import JSONResponse from '../utils/response'

class UsersController {
  public usersService = new UsersService()

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: RequestQuery = req.query

      const users: UsersResponse = await this.usersService.getUsers(query)
      JSONResponse.success(req, res, 'success', users)
    } catch (e: any) {
      JSONResponse.serverError(req, res, e.message)
    }
  }

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const user: User | null = await this.usersService.getUserById(id)
      res.status(200).json({ user })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = UserRequest.parse(req.body) as User

      const newUser: User = await this.usersService.createUser(body)
      res.status(201).json({ user: newUser })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const userUpdate: User = req.body
      const updatedUser: User = await this.usersService.updateUser(id, userUpdate)
      res.status(200).json({ user: updatedUser })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const deletedUser: User = await this.usersService.deleteUser(id)
      res.status(200).json({ user: deletedUser })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }
}

export default UsersController
