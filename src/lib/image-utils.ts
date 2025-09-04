/**
 * Utilidades para el manejo de imágenes en Astro
 */

import type { ImageMetadata } from "astro";

/**
 * Mapeo de rutas de imágenes a sus imports dinámicos
 * Esto es necesario porque Astro requiere imports estáticos para las imágenes en src/assets/
 */
const IMAGE_IMPORTS: Record<string, () => Promise<{ default: ImageMetadata }>> =
	{
		"/me.webp": () => import("../../public/me.webp"),
		// Añadir más imágenes aquí según sea necesario
	};

/**
 * Convierte una ruta de imagen (string) a ImageMetadata
 * Solo funciona para imágenes en src/assets/ que hayan sido pre-definidas
 *
 * @param imagePath - Ruta de la imagen (ej: '/me.webp')
 * @returns Promise<ImageMetadata | null>
 */
export async function getImageMetadata(
	imagePath: string,
): Promise<ImageMetadata | null> {
	const importFn = IMAGE_IMPORTS[imagePath];

	if (!importFn) {
		console.warn(`No se encontró import para la imagen: ${imagePath}`);
		return null;
	}

	try {
		const imageModule = await importFn();
		return imageModule.default;
	} catch (error) {
		console.error(`Error al cargar la imagen ${imagePath}:`, error);
		return null;
	}
}

/**
 * Determina si una ruta de imagen es local (en src/assets/) o remota/pública
 *
 * @param imagePath - Ruta de la imagen
 * @returns boolean
 */
export function isLocalImage(imagePath: string): boolean {
	return (
		imagePath.startsWith("./") ||
		imagePath.startsWith("../") ||
		!imagePath.startsWith("/")
	);
}

/**
 * Prepara la imagen para ser usada con OptimizedPicture
 * Maneja tanto imágenes locales como públicas/remotas
 *
 * @param imagePath - Ruta de la imagen
 * @returns Promise<ImageMetadata | string>
 */
export async function prepareImageForOptimizedPicture(
	imagePath: string,
): Promise<ImageMetadata | string> {
	// Si la imagen está en public/ o es una URL remota, devolver el string directamente
	if (imagePath.startsWith("/") || imagePath.startsWith("http")) {
		return imagePath;
	}

	// Si es una imagen local, intentar convertir a ImageMetadata
	const metadata = await getImageMetadata(imagePath);
	return metadata || imagePath;
}
