import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { RequestExt } from "middelware.type";

export const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers?.authorization;
    const jwt = Array.isArray(authorizationHeader) ? authorizationHeader.pop()?.split(" ").pop() : authorizationHeader?.split(" ").pop() || "";

    if (!jwt) {
      return res.status(401).send("Authorization header missing or invalid");
    }
    
    const user = verifyToken(jwt); // Aquí supongo que veryfyToken devuelve el usuario autenticado

    // Verificar si el usuario tiene el campo 'isAdmin' y su valor es true
    if (user && typeof user === 'object' && 'isAdmin' in user && user.isAdmin) {
      // El usuario es un admin
      req.user = user; // Almacenar el usuario en la solicitud
      next();
    } else {
      // El usuario no es un admin, devolver un error 401
      return res.status(401).send("Unauthorized. User is not an admin.");
    }
  } catch (error) {
    console.error('Error during JWT verification:', error);
    return res.status(500).send("An error occurred while verifying the session");
  }
};

export const checkJwtGeneral = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers?.authorization;
    const jwt = Array.isArray(authorizationHeader) ? authorizationHeader.pop()?.split(" ").pop() : authorizationHeader?.split(" ").pop() || "";

    if (!jwt) {
      return res.status(401).send("Authorization header missing or invalid");
    }
    
    const user = verifyToken(jwt); // Aquí supongo que verifyToken devuelve el usuario autenticado

    if (user) {
      // El usuario está autenticado, almacenar el usuario en la solicitud
      req.user = user;
      next();
    } else {
      // El token no es válido, devolver un error 401
      return res.status(401).send("Invalid token");
    }
  } catch (error) {
    console.error('Error during JWT verification:', error);
    return res.status(500).send("An error occurred while verifying the session");
  }
};
