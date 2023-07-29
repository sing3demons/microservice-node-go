import { Router } from 'express'
import UsersController from './controller/users.controller'
import { decodeToken } from './utils/jwt'
import { upload } from './utils/upload'

const router = Router({ caseSensitive: true })
const usersController = new UsersController()

router.post('/auth/register', usersController.register)
router.post('/auth/sign-in', usersController.login)

router.get('/users', decodeToken, usersController.getUsers)

router.get('/users/:id', decodeToken, usersController.getUserById)

router.put('/users/:id', decodeToken, usersController.updateUser)
router.patch(
  '/users/:id/profile',
  decodeToken,
  upload.single('avatar'),
  usersController.uploadProfile
)

router.delete('/users/:id', decodeToken, usersController.deleteUser)

export default router
