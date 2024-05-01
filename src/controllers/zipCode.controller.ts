import db from "../config/dbConnect";
import json from "../json/zipCodes.json";
import { Request, Response } from "express";
import { ZipCodeData } from "controllers.type";
import { loadZipCodeData } from "../utils/functionZipCode";
import { ZipCodeInput } from "../db/models/zipcode";

export const validateZipCode = (req: Request, res: Response) => {
  try {
    const zipCode: string = req.body.zipCode;
    
    if (!zipCode || isNaN(parseInt(zipCode))) {
      res.status(400).json({
        status: 400,
        message: 'zipcode invalidate',
        validate: false,
      });
      return;
    }
    const jsonData: { [code: string]: ZipCodeData } = json;

    if (!jsonData[zipCode]) {
      res.json({
        status: 400,
        message: 'zipcode invalidate',
        validate: false,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      validate: true,
      message: 'zipcode validate',
      zipCodeData: {
        ...jsonData[zipCode],
        code: zipCode,
      },
    }); // Código postal encontrado
  } catch (error) {
    console.error("Error al validar el código postal:", error);
    res.status(500).json(false); // Error interno del servidor
  }
};

export const findMatchingZipCodes = (req: Request, res: Response) => {
  try {
    const searchText: string = req.body.searchText; // Texto de búsqueda desde el front-end
    if (!searchText) {
      res.status(400).json([]);
      return;
    }

    const zipCodeData: string[] = loadZipCodeData();
    const matches: string[] = [];

    for (const zipCodeEntry of zipCodeData) {
      if (zipCodeEntry && zipCodeEntry.includes(searchText)) {
        matches.push(zipCodeEntry);
      }
    }

    res.json(matches.reverse());
  } catch (error) {
    console.error("Error al buscar coincidencias de códigos postales:", error);
    res.status(500).json([]);
  }
};

export const createZipCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { city, code, state }: ZipCodeInput = req.body;
  try {
    const checkCode = await db.ZipCode.findOne({
      where: { code },
    });

    if (checkCode) {
      return res.status(200).send({
        status: 200,
        message: "ZipCode already exists",
        zipCode: checkCode,
      });
    }

    const newZipCode = await db.ZipCode.create({
      city,
      code,
      state,
    });

    return res.status(200).send({
      status: 200,
      message: "ZipCode was created correctly",
      zipCode: newZipCode,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};
