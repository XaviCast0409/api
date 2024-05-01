import json from "../json/zipCodes.json";
import { ZipCodeData } from "controllers.type";

export function loadZipCodeData(): string[] {
  try {
    const jsonData: { [code: string]: ZipCodeData } = json;
    return Object.keys(jsonData);
  } catch (error) {
    console.error("Error cargando los datos de los códigos postales:", error);
    return [];
  }
}
