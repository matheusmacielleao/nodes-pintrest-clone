import multer, { diskStorage } from "multer";
import crypto from "crypto";
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Files will be saved in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const extensaoArquivo = file.originalname.split(".")[1];
    const novoNomeArquivo = crypto.randomBytes(64).toString("hex");
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

export const uploadImages = multer({ storage });
