import db from "../config/dbConnect";
import { Request, Response } from "express";
import { ClassTradeInput } from "../db/models/classTrade";

export const createClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ClassId, TradeId }: ClassTradeInput = req.body;

  try {
    const createClassTrade = await db.ClassTrade.create({
      ClassId,
      TradeId,
    });

    return res.status(201).json({
      message: "ClassTrade created successfully",
      status: 201,
      ClassTrade: createClassTrade,
      isSuccess: true,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      message: "Company-Trade already exists",
      status: 500,
      isSuccess: false,
    });
  }
};

export const createClassTrade = async (ClassId: number, TradeId: number) => {
  try {
    const createClassTrade = await db.ClassTrade.create({
      ClassId,
      TradeId,
    });

    return createClassTrade;
  } catch (error) {
    console.error("Error creating company:", error);
    return;
  }
}

export const deleteClassTrade = async (req: Request, res: Response): Promise<Response> => {
  const { ClassId, TradeId }: ClassTradeInput = req.body; // Asumo que los IDs se envían en el cuerpo de la solicitud

  try {
    // Busca el registro ClassTrade que coincida con los IDs proporcionados
    const classTrade = await db.ClassTrade.findOne({
      where: {
        ClassId,
        TradeId,
      },
    });

    if (!classTrade) {
      return res.status(404).json({
        message: "ClassTrade not found",
        status: 404,
        isSuccess: false,
      });
    }

    // Elimina el registro ClassTrade
    await classTrade.destroy();

    return res.status(200).json({
      message: "ClassTrade deleted successfully",
      status: 200,
      isSuccess: true,
    });
  } catch (error) {
    console.error("Error deleting ClassTrade:", error);
    return res.status(500).json({
      message: "Error deleting ClassTrade",
      status: 500,
      isSuccess: false,
    });
  }
};
