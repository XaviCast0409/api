import db from "../config/dbConnect";
import cloudinary from "../config/cloudinaryConfig";
import { Request, Response } from "express";

// Get all blogs
export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const blogs = await db.Blog.findAll();
    return res.status(200).json({
      message: "ok",
      status: 200,
      blogs,
    });
  } catch (error: any) {
    console.error("Error getting blogs:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

// Get a single blog by ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await db.Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    console.log("Creating blog with title:", req.body.title);
    console.log("Content:", req.body.content);
    console.log("File:", req.body.imageUrl);
    const { title, content, imageUrl } = req.body;

    const blog = await db.Blog.create({ title, content, imageUrl });
    console.log("Blog created:", blog);

    // Devuelve la respuesta exitosa con el blog creado
    console.log("Sending response");
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a blog by ID
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    // Verifica si se reciben correctamente los datos del formulario
    console.log("Title:", title);
    console.log("Content:", content);

    // Verifica si se recibió correctamente el archivo de imagen
    console.log("File:", req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const [updatedRowsCount, updatedBlogs] = await db.Blog.update(
      { title, content, imageUrl },
      { where: { id: req.params.id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlogs[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await db.Blog.destroy({ where: { id: req.params.id } });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
