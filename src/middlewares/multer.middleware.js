import multer from "multer";

const storage = multer.diskStorage({
    // “Store uploaded files on disk (your server) instead of memory.”
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    // This function decides what name the file will have
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage });