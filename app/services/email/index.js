/* istanbul ignore file */
import sendGrid from '@sendgrid/mail';
import { constants, ModuleError } from '../../utils';
import config from '../../../config/env';
import { adminResetPasswordHtml } from './templates';

const { EMAIL, NODE_ENV } = config;
const { EMAIL_WAS_NOT_SENT } = constants;

sendGrid.setApiKey(config.SENDGRID_APIKEY);

/**
 * It contains methods for sending emails.
 *
 * @class Email
 */
class Email {
  /**
   * Sends emails through the mail client.
   * @static
   * @param {object} options - An object whose properties are used to configure the mail client.
   * @param {string} options.to - Recipient's email address.
   * @param {string} options.subject - The mail's subject.
   * @param {string} options.html - The message to be sent in html format.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async send({ to, subject, html, from = 'API' }) {
    const msg = {
      to,
      from: { email: EMAIL, from },
      subject,
      html
    };
    try {
      return NODE_ENV === 'test' ? 'success' : await sendGrid.send(msg);
    } catch (error) {
      return new ModuleError({
        message: error.message,
        status: EMAIL_WAS_NOT_SENT
      });
    }
  }

  /**
   * Sends new password to admin.
   * @static
   * @param {object} first_name - The Recipient's first-name.
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static adminForgotPassword(
    { firstName, email, password },
    subject = 'Password Reset'
  ) {
    const emailContent = adminResetPasswordHtml(firstName, password);
    return Email.send({ to: email, subject, html: emailContent });
  }
}
export default Email;
