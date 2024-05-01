import db from "../config/dbConnect";
import { Request, Response } from "express";
import { CompanyTradeInput } from "../db/models/companyTrade";

export const createCompanyTrade = async (req: Request, res: Response): Promise<Response> => {
  const { CompanyId, TradeId }: CompanyTradeInput = req.body
  
  try {
    const createCompanyTrade = await db.CompanyTrade.create({
      CompanyId, TradeId
    })

    return res.status(201).json({
      message: 'CompranyTrade created successfully',
      status: 201,
      CompanyTrade: createCompanyTrade,
      isSuccess: true
    });
  } catch (error) {
    console.error('Error creating company:', error);
    return res.status(500).json({
      message: 'Company-Trade already exists',
      status: 500,
      isSuccess: false
    });
  }
}