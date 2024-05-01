"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
// Configura Cloudinary una vez con tus credenciales
cloudinary_1.v2.config({
    cloud_name: 'dj8g1egez',
    api_key: '456967315687326',
    api_secret: 'JvH4A6RhMv85J8DZlnE6p6G_mM0'
});
exports.default = cloudinary_1.v2;
