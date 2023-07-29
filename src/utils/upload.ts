import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { TokenData, TokenDt } from '../dto/users'
import { Request } from 'express'
const rootDir = path.join('public', 'images')

if (!fs.existsSync(rootDir)) {
  fs.mkdirSync(rootDir, { recursive: true })
}

const requestToken = (req: Request): TokenDt => {
  const reqToken = req as TokenData
  return reqToken.TokenDt
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootDir)
  },
  filename: function (req, file, cb) {
    const { userId }: TokenDt = requestToken(req)
    if (!userId) {
      throw new Error('user not found')
    }

    const subString = userId.substring(3, 8)
    const fileName = `${Date.now()}-${subString}-${Math.round(
      Math.random() * 1e9
    )}.png`
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage })

export { upload }
