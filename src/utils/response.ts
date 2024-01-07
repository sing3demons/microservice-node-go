import { Request, Response } from 'express'
import Logger from './logger'
import { Sensitive } from '../dto'
import { maskEmail } from './sensitive'

class JSONResponse {
  private static logger = Logger

  static success(req: Request, res: Response, message: string, data?: object) {
    req.body.password && delete req.body.password

    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }

    if (data) {
      if (Object.prototype.hasOwnProperty.call(data, 'users')) {
        const users = (data as Sensitive)['users']
        users.forEach((item: Sensitive) => {
          if (item['password']) {
            if (item['password']) {
              delete item['password']
            }

            if (item['email']) {
              item['email'] = maskEmail(item['email'])
            }
          }
        })
      } else if (typeof data === 'object' && data !== null) {
        if (Object.prototype.hasOwnProperty.call(data, 'password')) {
          if ((data as Sensitive)['password']) {
            delete (data as Sensitive)['password']
          }
          if ((data as Sensitive)['email']) {
            delete (data as Sensitive)['email']
          }
        }
      }
    }

    this.logger.info({
      headers,
      ip: req.ip,
      method: req.method,
      url: req.url,
      query: req.query,
      body: req.body,
      data: data
    })

    res.status(200).json({
      code: 200,
      message: message || 'success',
      data: data
    })
  }

  static create(req: Request, res: Response, message: string, data: object) {
    req.body.password && delete req.body.password

    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }
    this.logger.info(
      JSON.stringify({
        headers,
        ip: req.ip,
        method: req.method,
        url: req.url,
        body: req.body,
        data: data
      })
    )

    res.status(201).json({
      code: 201,
      message: message || 'created',
      data: data
    })
  }

  static badRequest(
    req: Request,
    res: Response,
    message: string,
    data?: object
  ) {
    if (req.body?.password) {
      delete req.body.password
    }

    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }

    this.logger.info(
      JSON.stringify({
        headers,
        ip: req.ip,
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
        data: data
      })
    )

    res.status(400).json({
      code: 400,
      message: message || 'bad request',
      data: data
    })
  }

  static notFound(req: Request, res: Response, message: string) {
    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }

    this.logger.error(
      JSON.stringify({
        headers,
        ip: req.ip,
        method: req.method,
        url: req.url,
        query: req.query
      })
    )

    res.status(404).json({
      code: 404,
      message: message || 'not found'
    })
  }

  static unauthorized(req: Request, res: Response, message: string) {
    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }
    this.logger.error(
      JSON.stringify({
        headers,
        ip: req.ip,
        method: req.method,
        url: req.url,
        query: req.query
      })
    )

    res.status(401).json({
      code: 401,
      message: message || 'unauthorized'
    })
  }

  static forbidden(req: Request, res: Response, message: string) {
    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }
    this.logger.info(req.url, {
      headers,
      ip: req.ip,
      method: req.method,
      url: req.url,
      query: req.query
    })
    res.status(403).json({
      code: 403,
      message: message || 'forbidden'
    })
  }

  static serverError(
    req: Request,
    res: Response,
    message?: string,
    data?: object
  ) {
    const headers = {
      userAgent: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua'],
      mobile: req.headers['sec-ch-ua-mobile'],
      operatingSystem: req.headers['sec-ch-ua-platform'],
      browser: req.headers['sec-ch-ua']
    }
    this.logger.info(req.url, {
      headers,
      ip: req.ip,
      method: req.method,
      url: req.url,
      query: req.query,
      data: data
    })

    res.status(500).json({
      code: 500,
      message: message || 'internal server error',
      data: data
    })
  }
}

export default JSONResponse
