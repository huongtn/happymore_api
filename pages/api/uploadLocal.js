import nc from "next-connect";
import onError from "../../common/errormiddleware";
import multer from "multer";
import path from "path";
var fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = nc(onError);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

let upload = multer({
    storage: storage,
}); 
let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => { 
    // var filePath = "public/" + req.file.filename;
    // fs.unlinkSync(filePath);
    let url = "http://" + req.headers.host; 
    res.status(200).send({ 
        url: url + "/public/" + req.file.filename,
    });
});

export default handler;
