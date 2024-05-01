import db from "../config/dbConnect";
import { Request, Response } from "express";
import { AddEstimateAction, AddProjectDetail } from "controllers.type";
import { TradeInput, TradeOutput } from "../db/models/trade";
import { createClassTrade } from "./classTrade.controller";

export const getAllTrade = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const findAllTrades: TradeOutput[] = await db.Trade.findAll();

    return res.status(200).send({
      message: "ok",
      status: 200,
      trade: findAllTrades,
    });
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

export const getAllTradePagination = async (req: Request, res: Response): Promise<Response> => {
  const { page, size } = req.query;
  const pageNumber: number = parseInt(page as string, 10);
  const pageSize: number = parseInt(size as string, 10);
  const offset: number = (pageNumber - 1) * pageSize;
  try {
    const { count, rows } = await db.Trade.findAndCountAll({
      offset,
      limit: pageSize,
    });
    const totalPages = Math.ceil(count / pageSize);
    return res.status(200).send({
      message: "Success",
      status: 200,
      totalPages,
      currentPage: pageNumber,
      totalTrade: count,
      trades: rows,
    })

  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }

}

export const getTradeById = async (req: Request, res: Response) => {
  const { TradeId } = req.query
  try {
    const findTradeId = await db.Trade.findOne({
      where: { name: TradeId },
      include: db.Class
    })
    return res.status(200).send({
      message: "ok",
      status: 200,
      trade: findTradeId,
    });
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

export const createTrade = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, account, classIdArray }: TradeInput = req.body;

  // Validación de datos de entrada
  if (!name || !account) {
    return res.status(400).json({
      message: 'Name and account are required',
      status: 400,
    });
  }

  try {
    const findTrade = await db.Trade.findOne({
      where: { name },
    });

    if (findTrade) {
      return res.status(400).json({
        message: 'Trade already exists',
        status: 400,
      });
    }

    const newTrade = await db.Trade.create({
      name,
      account,
    });

    if (classIdArray && classIdArray.length > 0) {
      console.log(classIdArray);
      for await (const classId of classIdArray) {
        if (classId === 0) {
          continue; // Ignora la iteración actual y pasa a la siguiente
        }
        await createClassTrade(classId, newTrade.id);
      }
    }

    const tradeClass = await db.Trade.findOne({
      where: { id: newTrade.id },
      include: db.Class,
    });

    return res.status(201).json({
      message: 'Trade was created',
      status: 201,
      trade: tradeClass,
    });

  } catch (error: any) {
    console.error('Error creating trade:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: error.message,
    });
  }
};
export const addEstimateAction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { EstimateActionId, TradeId }: AddEstimateAction = req.body;
  try {
    const updateTrade = await db.Trade.update(
      { EstimateActionId },
      { where: { id: TradeId } }
    );

    if (updateTrade[0] === 1) {
      return res.status(200).json({
        message: "EstimateActionId added successfully to Trade",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "Trade not found",
        status: 404,
      });
    }
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

export const addProjectDetail = async (req: Request, res: Response) => {
  const { ProjectDetailId, TradeId }: AddProjectDetail = req.body;
  try {
    const updateTrade = await db.Trade.update(
      { ProjectDetailId },
      { where: { id: TradeId } }
    );

    if (updateTrade[0] === 1) {
      return res.status(200).json({
        message: "ProjectDetailId added successfully to Trade",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "Trade not found",
        status: 404,
      });
    }
  } catch (error: any) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};
