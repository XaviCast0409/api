import db from "../config/dbConnect";
import { Request, Response } from "express";
import { UserTradeInput } from "../db/models/userTrade";

export const createUserTrade = async (req: Request, res: Response): Promise<Response> => {
  const { UserId, TradeId }: UserTradeInput = req.body
  try {
    const createUserTrade = await db.UserTrade.create({
      UserId, TradeId
    })
    return res.status(201).json({
      message: 'UserTrade created successfully',
      status: 201,
      UserTrade: createUserTrade
    });
  } catch (error) {
    console.error('Error creating company:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500
    });
  }
}