import db from "../config/dbConnect";
import { Request, Response } from "express";

export const createTradeCompanyUser = async (name: string) => {
  try {
    const tradeCompanyProfile = await db.TradeCompanyUser.create({
      name,
    });
    return tradeCompanyProfile;
  } catch (error: any) {
    return error;
  }
};

export const createRelationCompanyProfileTrade = async (req: Request, res: Response) => {
  try {
    const { name, companyId } = req.body;
    
    if (!name || !companyId) {
      return res.status(400).json({
        message: "Please provide a name and company id",
        status: 400,
      });
    }
    const findTradeProfile = await db.TradeCompanyUser.findOne({
      where: { name },
    });
    if (findTradeProfile) {
      return res.status(400).json({
        message: "Trade Profile already exists",
        status: 400,
      });
    }
    const createTradeProfile = await createTradeCompanyUser(name);

    const relationTradeProfile = await db.TradeCompanyProfile.create({
      TradeCompanyUserId: createTradeProfile.id,
      CompanyId: companyId,
    });
    return res.status(201).json({
      message: "Company Profile created successfully",
      status: 201,
      data: relationTradeProfile,
      trade: createTradeProfile,
    });
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
}

export const createTradeClassCompanyUser = async (req: Request, res: Response) => {
  try {
    const { ClassId, TradeCompanyUserId } = req.body;
    if (!ClassId || !TradeCompanyUserId) {
      return res.status(400).json({
        message: "Please provide a ClassId and TradeCompanyUserId",
        status: 400,
      });
    }
    const findTradeClassCompanyUser = await db.TradeClassCompanyUser.findOne({
      where: { ClassId, TradeCompanyUserId },
    });
    if (findTradeClassCompanyUser) {
      return res.status(400).json({
        message: "Trade Class Company User already exists",
        status: 400,
      });
    }
    const createTradeClassCompanyUser = await db.TradeClassCompanyUser.create({
      ClassId,
      TradeCompanyUserId,
    });
    return res.status(201).json({
      message: "Trade Class Company User created successfully",
      status: 201,
      data: createTradeClassCompanyUser,
    });
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
}

export const getTradeCompanyUser = async (req: Request, res: Response) => {
  try {
    const tradeCompanyUser = await db.TradeCompanyUser.findAll();
    return res.status(200).json({
      message: "Trade Company User retrieved successfully",
      status: 200,
      data: tradeCompanyUser,
    });
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
}

export const deleteTradeClassCompanyUser = async (req: Request, res: Response) => {
  try {
    const { ClassId, TradeCompanyUserId } = req.body;
    
    if (!ClassId || !TradeCompanyUserId) {
      return res.status(400).json({
        message: "Please provide a ClassId and TradeCompanyUserId",
        status: 400,
      });
    }

    const findTradeClassCompanyUser = await db.TradeClassCompanyUser.findOne({
      where: { ClassId, TradeCompanyUserId },
    });

    if (!findTradeClassCompanyUser) {
      return res.status(404).json({
        message: "Trade Class Company User not found",
        status: 404,
      });
    }

    await findTradeClassCompanyUser.destroy();

    return res.status(200).json({
      message: "Trade Class Company User deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error deleting Trade Class Company User:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};