import nc from "next-connect";
import onError from "../../common/errormiddleware";
const aws = require('aws-sdk');
const multer = require('multer');

const multerS3 = require('multer-s3');

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = nc(onError);
const spacesEndpoint = new aws.Endpoint(process.env.URL_SERVER);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
});
let fileName = '';
let uploadFile = multer({
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    storage: multerS3({
        s3,
        bucket: process.env.BACUKET_NAME,
        acl: 'public-read',
        // eslint-disable-next-line
        key: function (req, file, cb) { 
            fileName = `${req.query.type}/${Date.now().toString()}_${file.originalname}`;
            cb(null, fileName);
        },
        // contentType: function (req, file, cb) {
        //     cb(null, `application/pdf`);
        // },
    }),
}).single('file');

handler.use(uploadFile);
handler.post(async (req, res) => {
    res.status(200).send({
        url: `${process.env.ENDPOINT}/${fileName}`,
    });
});
export default handler;
