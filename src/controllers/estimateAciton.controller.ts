import db from "../config/dbConnect";
import { Request, Response } from "express";
import { EstimateActionInput, EstimateActionOutput } from "../db/models/estimateAction";


export const getAllEstimaticionAction = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const getAllAction: EstimateActionOutput[] = await db.EstimateAction.findAll()

    return res.status(200).json({
      message: 'ok',
      status: 200,
      estimateActions: getAllAction
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

export const createAction = async (req: Request, res:Response) => {
  const { name }: EstimateActionInput = req.body
  try {
    const findAction = await db.EstimateAction.findOne({
      where: { name }
    })
    if (findAction) {
      return res.status(400).json({
        message: 'Action already exists',
        status: 400
      });
    }

    const createAction = await db.EstimateAction.create({
      name
    })
    return res.status(201).json({
      message: 'Action created successfully',
      status: 201,
      estimateAction: createAction
    });
  } catch (error: any) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: error.message,
    });
  }
}

