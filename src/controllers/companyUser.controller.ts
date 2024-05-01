import db from "../config/dbConnect";
import { Request, Response } from "express";
import { CompanyUserInput } from "../db/models/companyUser";
import stripe from "../stripe/stripeConfig";

export const createCompanyUser = async (req: Request, res: Response): Promise<Response> => {
  const { UserId, CompanyId }: CompanyUserInput = req.body;

  try {   
    const createCompanyUser = await db.CompanyUser.create({
      UserId, CompanyId
    });

    // pago de los 5 dolares
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "usd",
      customer: UserId.toString(), //custumerId
      confirm: true, 
      metadata: {
        CompanyId: CompanyId.toString()
      }
    });

    return res.status(201).json({
      message: 'CompanyUser created successfully',
      status: 201,
      CompanyUser: createCompanyUser,
      paymentIntent 
    });
  } catch (error) {
    console.error('Error creating company user:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500
    });
  }
};

export const createCompanyUserFunction = async (UserId: number, CompanyId: number): Promise<void> => {
  try {   
    const createCompanyUser = await db.CompanyUser.create({
      UserId: UserId, CompanyId: CompanyId
    });
    console.log('CompanyUser created successfully', createCompanyUser);
  } catch (error) {
    console.error('Error creating company user:', error);
    throw error;
  }
};