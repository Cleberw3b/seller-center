
//
//      Upload Service
//



import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { AWS_ACCESS_KEY, AWS_ACCESS_SECRET, AWS_REGION } from '../utils/consts'
import { HttpStatusResponse } from '../utils/httpStatus'

const s3 = new aws.S3()

s3.config.update( {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET,
    region: AWS_REGION,
    signatureVersion: 'v4'
} )

type MuterCallback = ( error: any, key?: boolean | undefined ) => void

const error1: HttpStatusResponse = {
    message: "Invalid file type, only JPG, JPEG and PNG is allowed.",
    status: 400
}

const error2: HttpStatusResponse = {
    message: "Invalid file type, only JPG, JPEG and PNG is allowed.",
    status: 400
}

const fileFilter = ( req: Express.Request, file: Express.Multer.File, cb: MuterCallback ) => {

    if ( file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" )
        cb( error1, false )

    if ( file.size >= 4096 )
        cb( error2, false )

    cb( null, true )
}

export const upload = multer( {
    fileFilter,
    storage: multerS3( {
        s3: s3,
        bucket: 'ozllo-seller-center-photos',
        metadata: function ( req, file, cb ) {
            cb( null, { fieldName: file.fieldname } )
        },
        key: function ( req, file, cb ) {
            cb( null, Date.now().toString() + '__' + file.originalname )
        },
    } )
} )
