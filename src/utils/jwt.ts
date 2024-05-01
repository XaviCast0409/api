import dotenv from 'dotenv'
import { sign, verify } from "jsonwebtoken";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101"

export const generateToken = (id: string, isAdmin: boolean) => {
  const jwt = sign({ id, isAdmin }, JWT_SECRET, {
    expiresIn: '2h'
  });
  return jwt;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};