"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwtGeneral = exports.checkJwt = void 0;
const jwt_1 = require("../utils/jwt");
const checkJwt = (req, res, next) => {
    var _a, _b;
    try {
        const authorizationHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const jwt = Array.isArray(authorizationHeader) ? (_b = authorizationHeader.pop()) === null || _b === void 0 ? void 0 : _b.split(" ").pop() : (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ").pop()) || "";
        if (!jwt) {
            return res.status(401).send("Authorization header missing or invalid");
        }
        const user = (0, jwt_1.verifyToken)(jwt); // Aquí supongo que veryfyToken devuelve el usuario autenticado
        // Verificar si el usuario tiene el campo 'isAdmin' y su valor es true
        if (user && typeof user === 'object' && 'isAdmin' in user && user.isAdmin) {
            // El usuario es un admin
            req.user = user; // Almacenar el usuario en la solicitud
            next();
        }
        else {
            // El usuario no es un admin, devolver un error 401
            return res.status(401).send("Unauthorized. User is not an admin.");
        }
    }
    catch (error) {
        console.error('Error during JWT verification:', error);
        return res.status(500).send("An error occurred while verifying the session");
    }
};
exports.checkJwt = checkJwt;
const checkJwtGeneral = (req, res, next) => {
    var _a, _b;
    try {
        const authorizationHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const jwt = Array.isArray(authorizationHeader) ? (_b = authorizationHeader.pop()) === null || _b === void 0 ? void 0 : _b.split(" ").pop() : (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ").pop()) || "";
        if (!jwt) {
            return res.status(401).send("Authorization header missing or invalid");
        }
        const user = (0, jwt_1.verifyToken)(jwt); // Aquí supongo que verifyToken devuelve el usuario autenticado
        if (user) {
            // El usuario está autenticado, almacenar el usuario en la solicitud
            req.user = user;
            next();
        }
        else {
            // El token no es válido, devolver un error 401
            return res.status(401).send("Invalid token");
        }
    }
    catch (error) {
        console.error('Error during JWT verification:', error);
        return res.status(500).send("An error occurred while verifying the session");
    }
};
exports.checkJwtGeneral = checkJwtGeneral;
