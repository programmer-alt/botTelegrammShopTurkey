import path from 'path';

export const getImagePath = (imagePath: string | undefined): string | undefined => {
    if (!imagePath) {
        return undefined;
    }
    const fileName = path.basename(imagePath);
    return path.join(__dirname, '../../src/imagesProducts', fileName );
};