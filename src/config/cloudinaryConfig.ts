import { v2 as cloudinary } from 'cloudinary';

// Configura Cloudinary una vez con tus credenciales
cloudinary.config({
  cloud_name: 'dj8g1egez',
  api_key: '456967315687326',
  api_secret: 'JvH4A6RhMv85J8DZlnE6p6G_mM0'
});

export default cloudinary;
