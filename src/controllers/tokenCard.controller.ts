import db from "../config/dbConnect";
import { Request, Response } from "express";
import { TokenInput } from "../db/models/token";

export const createTokenCard = async (req: Request, res: Response): Promise<Response> => {
  const { token }: TokenInput = req.body
  try {
    const createToken = await db.Token.create({
      token
    })
    return res.status(200).json({
      message: 'ok',
      status: 200,
      tokenId: createToken //cambiar por solo token por seguridad
    })
  } catch (error: any) {
    console.error('Error retrieving companies:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: error.message,
    });
  }
}