import db from "../config/dbConnect";
import { Request, Response } from "express";
import { CompanyInput } from "../db/models/company";
import { verified, encrypt } from "../utils/hass";
import { CompanyLogin, AddTokenCard, CompanyStatus } from "controllers.type";
import { generateToken } from "../utils/jwt";
import { createCustomer } from "../controllers/stripe.controllers";

export const getAllCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page, size } = req.query;
  const pageNumber: number = parseInt(page as string, 10);
  const pageSize: number = parseInt(size as string, 10);
  const offset: number = (pageNumber - 1) * pageSize;
  try {
    const { count, rows } = await db.Company.findAndCountAll({
      offset,
      limit: pageSize,
      include: [
        {
          model: db.Token,
        },
        {
          model: db.ZipCode,
        },
        {
          model: db.Trade,
          include: db.Class
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    return res.status(200).send({
      message: "Success",
      status: 200,
      totalPages,
      currentPage: pageNumber,
      totalCompany: count,
      companies: rows,
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

export const createCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name_company,
    address,
    phone,
    email,
    password,
    ZipCodeId,
    customerstripeId
  }: CompanyInput = req.body;

  try {
    const existingCompany = await db.Company.findOne({
      where: { email },
    });

    if (existingCompany) {
      console.log("Company already exists");
      return res.status(200).json({
        message: "Company already exists",
        status: 400,
        created: false,
      });
    }

    const hashedPassword = await encrypt(password);

    const createdCompany = await db.Company.create({
      name_company,
      address,
      phone,
      email,
      password: hashedPassword,
      ZipCodeId,
      customerstripeId,
    });


    await createCustomer(email);

    console.log("Company created successfully:", createdCompany.get({ plain: true }));
    return res.status(201).json({
      message: "Company created successfully",
      status: 201,
      company: createdCompany,
      created: true
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      message: "Error created Company",
      created: false,
      status: 500,
    });
  }
};

export const companyLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password }: CompanyLogin = req.body;
  console.log(email, password);

  try {
    const checkIs = await db.Company.findOne({
      where: { email },
    });
    if (!checkIs) {
      return res.status(200).send({
        status: 400,
        message: "NOT_FOUND_USER",
        login: false,
        company: { token: "" }
      });
    }
    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) {
      return res.status(200).send({
        status: 400,
        message: "NOT_FOUND_USER",
        login: false,
        company: { token: "" }
      });
    }
    const token = generateToken(checkIs.id, checkIs.isAdmin);
    const data = {
      token
    };
    return res.status(200).send({
      status: 200,
      message: "Login correct",
      company: data,
      login: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      login: false
    });
  }
};

export const companyByZipCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { zipCode } = req.query;

  try {
    const findAllCompany = await db.Company.findAll({
      include: [
        {
          model: db.ZipCode,
          where: { code: zipCode },
        },
        {
          model: db.Trade
        },
      ],
    });

    if (findAllCompany.length === 0) {
      return res.status(400).json({
        message: "No hay compañias con ese codigo postal",
        status: "400",
        companies: [],
      });
    }
    return res.status(200).json({
      message: "ok",
      status: 200,
      companies: findAllCompany,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

export const addCardCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { TokenId, CompanyId }: AddTokenCard = req.body;
  try {
    const updatedCompany = await db.Company.update(
      { TokenId },
      { where: { id: CompanyId } }
    );
    if (updatedCompany[0] === 1) {
      return res.status(200).json({
        message: "TokenId added successfully to Company",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "Company not found",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

export const getCompanyById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const company = await db.Company.findByPk(id, {
      include: [
        {
          model: db.TradeCompanyUser,
          attributes: ["id", "name"],
          include: {
            model: db.Class,
            attributes: ["id", "name"],
          }
        },
        {
          model: db.User,
        }
      ],

    });
    if (company) {
      return res.status(200).json({
        message: "ok",
        status: 200,
        company,
      });
    } else {
      return res.status(404).json({
        message: "Company not found",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};
export const changeStatusCompany = async (req: Request, res: Response): Promise<Response> => {
  const { CompanyId, status }: CompanyStatus = req.body;

  if (!CompanyId || typeof status !== 'boolean') {
    return res.status(400).json({
      message: 'Invalid request body',
      status: 400,
    });
  }

  try {
    const company = await db.Company.findOne({
      where: { id: CompanyId }
    });

    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
        status: 404,
      });
    }

    company.status = status;
    const updatedCompany: CompanyInput = await company.save();

    return res.status(200).json({
      message: 'Company status has been changed',
      status: 200,
      company: updatedCompany,
    });
  } catch (error: any) {
    console.error('Error changing company status:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: error.message,
    });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const blogs = await db.Blog.findAll();
    return res.status(200).json({
      message: 'ok',
      status: 200,
      blogs,
    });
  } catch (error: any) {
    console.error('Error getting blogs:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
      error: error.message,
    });
  }
}