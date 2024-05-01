"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerHttp = void 0;
const handlerHttp = (res, error) => {
    console.log(error);
    return res.status(400).json(error);
};
exports.handlerHttp = handlerHttp;
