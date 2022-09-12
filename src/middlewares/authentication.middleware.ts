import { NextFunction, Response } from 'express'
import HttpException from '../exceptions/HttpException'
import { ethers } from 'ethers'

async function authenticate(token: string): Promise<string> {
  try {
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString())
    const signingAddress = await ethers.utils.verifyMessage(tokenData.message, tokenData.signature)
    return signingAddress.toLowerCase()
  } catch (err) {
    throw new HttpException(401, 'Invalid Bearer token')
  }
}

const authenticationMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.user = await authenticate(req.token)
    next()
  } catch (error) {
    next(error)
  }
}

export default authenticationMiddleware
