/* eslint-disable max-len */
import * as mailer from '@sendgrid/mail'
import environment from 'config/environment'

mailer.setApiKey(environment.SENDGRID_API_KEY)

export const sendMail = (mail: mailer.MailDataRequired) => mailer.send(mail)

export const sendConfirmationMail = (receiver: string, token: string) => {
    const confirmationLink = `${environment.HOST}/register/confirm/${token}`

    return sendMail({
        from: environment.EMAIL_SENDER,
        to: receiver,
        subject: 'Scapestory - confirmation link',
        text: `Welcome to Scapestory! Click on this link ${confirmationLink} or copy it into your address bar if you can't click it.`,
        html: `
        <div>
            <h1>Welcome to Scapestory!</h1>
            <p>Click on the link below to confirm your email and continue using Scapestory!<p/>
            <a href=${confirmationLink}>${confirmationLink}</a>
        </div>
        `,
    })
}
