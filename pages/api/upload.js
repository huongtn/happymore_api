import nc from "next-connect";
import onError from "../../common/errormiddleware";
const path = require('path');
var multer = require("multer");
var multerGoogleStorage = require("multer-google-storage");
export const config = {
    api: {
        bodyParser: false,
    },
};
let fileName = '';
const handler = nc(onError);
let uploadFile = multer({
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    storage: multerGoogleStorage.storageEngine(
        {
            autoRetry: true,
            bucket: process.env.BUCKET_NAME,
            projectId: process.env.PROJECT_ID,
            keyFilename: path.join(__dirname,"../../google-cloud.json"),
            filename: (req, file, cb) => {
                fileName=`/${Date.now()}_${file.originalname}`;
                cb(null, fileName);
            }
        }
    )
}).single('file');

handler.use(uploadFile);
handler.post(async (req, res) => {
    res.status(200).send({
        url: `https://storage.googleapis.com/${process.env.BUCKET_NAME}${fileName}`,
    });
});
export default handler;
