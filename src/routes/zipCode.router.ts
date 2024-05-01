import { Router } from "express";
import { validateZipCode, findMatchingZipCodes, createZipCode } from "../controllers/zipCode.controller";

const zipCodeRouter = Router()

zipCodeRouter.post('/validate-zip-code', validateZipCode)
zipCodeRouter.post('/validate-search-code', findMatchingZipCodes)
zipCodeRouter.post('/create-zip-code', createZipCode)

export default zipCodeRouter



