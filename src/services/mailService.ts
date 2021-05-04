//
//      Mail Service
//

import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import nodemailer from "nodemailer"
import { DEFAULT_PORT, EMAIL_PASSWORD, PROJECT_EMAIL, PROJECT_HOST, PROJECT_NAME } from "../utils/consts"
import { activationEmailContent } from "../models/activationEmail"
import { User } from "../models/user"
import { generateNewActivationToken } from "./tokenService"

const transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: PROJECT_EMAIL,
        pass: EMAIL_PASSWORD,
    }
} )

/**
 * Save a new user and creates account
 * 
 * @param email
 * @param password
 */
export const sendEmail = async ( email: string, subject: string, content: any = '' ): Promise<any> => {

    log( `Sending email to ${ email }`, 'EVENT', getFunctionName() )

    const mailOptions = {
        from: `${ PROJECT_NAME } <${ PROJECT_EMAIL }>`,
        to: email,
        subject,
        html: content
    }

    try {
        // send mail with defined transport object
        return await transporter.sendMail( mailOptions )
    } catch ( error ) {
        log( error.message, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }
}

export const sendEmailToActiveAccount = async ( user: User ): Promise<void> => {

    const path = '/auth/activate/'

    const uri = PROJECT_HOST + ':' + DEFAULT_PORT + path

    const activationToken = await generateNewActivationToken( user )

    if ( !activationToken || !activationToken.token ) {
        log( `Could not send activation email to ${ user.email }`, 'EVENT', getFunctionName(), 'ERROR' )
        return
    }

    const content = activationEmailContent( user, uri + activationToken.token )

    const result = await sendEmail( user.email, 'Active your account', content )

    result
        ? log( `Activation email sent to ${ user.email }`, 'EVENT', getFunctionName() )
        : log( `Could not send activation email to ${ user.email }`, 'EVENT', getFunctionName(), 'ERROR' )
}
