import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import APIHandler from './api';

const region = 'asia-east2';

export const sendEmailVerification = functions
  .region(region)
  .https.onCall(async (data, context) => {
    if (!data?.email) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Missing email'
      );
    }

    try {
      // replace this incase you are using this in production
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

      const email = await transporter.sendMail({
        from: 'Freedom Wall <freedom@wall.com>',
        to: data.email,
        subject: data?.subject || 'Email from Freedom Wall',
        html: data?.message || '<p>Empty, please reply to this email</p>'
      });

      console.log('Email sent: ', email.messageId);

      return {
        success: true,
        message: email.messageId
      };
    } catch (err) {
      console.log('ERROR ON SENDING EMAIL: ', err);
      throw new functions.https.HttpsError('internal', `${err}`);
    }
  });

export const api = functions.region(region).https.onRequest(APIHandler);
