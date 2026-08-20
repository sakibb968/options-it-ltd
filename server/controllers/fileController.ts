import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

export const fileController = {
  // Upload Single File (Image, PDF, Doc)
  uploadFile: async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file was uploaded.'
        });
      }

      const file = req.file;
      const fileUrl = `/uploads/${file.filename}`;
      const fileSizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully.',
        file: {
          originalName: file.originalname,
          fileName: file.filename,
          mimeType: file.mimetype,
          size: fileSizeMb,
          url: fileUrl
        }
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'File upload failed.',
        error: error.message
      });
    }
  },

  // Upload Multiple Files
  uploadMultipleFiles: async (req: AuthRequest, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded.'
        });
      }

      const uploadedFiles = files.map(file => ({
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: `/uploads/${file.filename}`
      }));

      return res.status(200).json({
        success: true,
        message: `${uploadedFiles.length} files uploaded successfully.`,
        files: uploadedFiles
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Upload failed.',
        error: error.message
      });
    }
  }
};
