import joi from 'joi';

/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
   * It validates a number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static numberCheck(param, min = 1) {
    return joi
      .number()
      .required()
      .min(min)
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`,
        'number.min': `${param} can not be lesser than ${min}`
      });
  }

  /**
   * It validates a string.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheck(param, min = 1, max = 12000000) {
    return joi
      .string()
      .required()
      .trim()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be greater than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`
      });
  }

  /**
   * It validates a password.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return joi.string().trim().required().min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      });
  }

  /**
   * It validates a string that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editStringCheck(param, min = 1, max = 5000) {
    return joi
      .string()
      .min(min)
      .max(max)
      .trim()
      .empty()
      .messages({
        'string.base': `${param}  must be a string`,
        'string.empty': `${param} cannot be an empty field`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.max': `${param} can not be greater than ${max} characters`
      });
  }

  /**
   * It validates a email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return joi.string().email().required().messages({
      'any.required': 'Email is a required field',
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }
}
export default ValidationHelper;
