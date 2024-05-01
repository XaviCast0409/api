"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getAllBlogs = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
// Get all blogs
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield dbConnect_1.default.Blog.findAll();
        return res.status(200).json({
            message: "ok",
            status: 200,
            blogs,
        });
    }
    catch (error) {
        console.error("Error getting blogs:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            error: error.message,
        });
    }
});
exports.getAllBlogs = getAllBlogs;
// Get a single blog by ID
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield dbConnect_1.default.Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getBlogById = getBlogById;
// Create a new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating blog with title:", req.body.title);
        console.log("Content:", req.body.content);
        console.log("File:", req.body.imageUrl);
        const { title, content, imageUrl } = req.body;
        const blog = yield dbConnect_1.default.Blog.create({ title, content, imageUrl });
        console.log("Blog created:", blog);
        // Devuelve la respuesta exitosa con el blog creado
        console.log("Sending response");
        res.status(201).json(blog);
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createBlog = createBlog;
// Update a blog by ID
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        let imageUrl = null;
        // Verifica si se reciben correctamente los datos del formulario
        console.log("Title:", title);
        console.log("Content:", content);
        // Verifica si se recibió correctamente el archivo de imagen
        console.log("File:", req.file);
        if (req.file) {
            const result = yield cloudinaryConfig_1.default.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const [updatedRowsCount, updatedBlogs] = yield dbConnect_1.default.Blog.update({ title, content, imageUrl }, { where: { id: req.params.id }, returning: true });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(updatedBlogs[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateBlog = updateBlog;
// Delete a blog by ID
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield dbConnect_1.default.Blog.destroy({ where: { id: req.params.id } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteBlog = deleteBlog;
