
//
//      Upload Service
//

import aws from 'aws-sdk'
import fs from 'fs'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { AWS_ACCESS_KEY, AWS_ACCESS_SECRET, AWS_REGION, IMPORT_FOLDER } from '../utils/consts'
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
    message: "Invalid file type, only xls and xlsx allowed.",
    status: 400
}

const productImageFilter = ( req: Express.Request, file: Express.Multer.File, cb: MuterCallback ) => {

    if ( file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" )
        cb( error1, false )

    cb( null, true )
}


const excelFilter = ( req: Express.Request, file: Express.Multer.File, cb: MuterCallback ) => {

    if (
        file.mimetype !== "application/vnd.ms-excel" &&
        file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
        cb( error2, false )

    cb( null, true )
}

export const uploadProductPicture = multer( {
    fileFilter: productImageFilter,
    storage: multerS3( {
        s3: s3,
        bucket: 'ozllo-seller-center-photos',
        acl: 'public-read',
        metadata: function ( req, file, cb ) {
            cb( null, { fieldName: file.fieldname } )
        },
        key: function ( req, file, cb ) {
            cb( null, Date.now().toString() + '_' + req.shop_id + '_' + file.originalname )
        },
    } )
} )

export const uploadProfilePicture = multer( {
    storage: multerS3( {
        s3: s3,
        bucket: 'ozllo-seller-center-photos',
        acl: 'public-read',
        metadata: function ( req, file, cb ) {
            cb( null, { fieldName: file.fieldname } )
        },
        key: function ( req, file, cb ) {
            cb( null, Date.now().toString() + '_' + req.user?._id )
        },
    } )
} )

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, IMPORT_FOLDER )
    },
    filename: ( req, file, cb ) => {
        cb( null, file.originalname )
    }
} )

export const importXLSX = multer( {
    fileFilter: excelFilter,
    storage
} )

export const deleteFile = ( filePath: string ) => {
    fs.unlinkSync( filePath )
}
