import db from "../config/dbConnect";
import { Request, Response } from "express";
import { ClassInput } from "../db/models/class";

export const classCreate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name }: ClassInput = req.body;
  try {
    const findClass = await db.Class.findOne({
      where: { name },
    });
    if (findClass) {
      return res.status(400).json({
        message: "class already exits",
        status: 400,
      });
    }

    const createClass = await db.Class.create({
      name,
    });

    return res.status(200).json({
      message: "Class created",
      status: 200,
      class: createClass,
    });
  } catch (error) {
    console.error("Error creating Class:", error);
    return res.status(500).json({
      message: "Class already exists",
      status: 500,
      isSuccess: false,
    });
  }
};

export const getAllClass = async (_req: Request, res: Response) => {
  try {
    const findAllClass = await db.Class.findAll();
    return res.status(200).json({
      message: "ok",
      status: 200,
      classes: findAllClass,
    });
  } catch (error) {
    console.error("Error creating Class:", error);
    return res.status(500).json({
      message: "Class already exists",
      status: 500,
      isSuccess: false,
    });
  }
};
