/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import config from '../../config/env';

import { Helpers, ApiError, genericErrors } from '../../app/utils';

import {
  originText,
  wrongText,
  genericErrorObj,
  genericNotFound,
  genericAuthRequired,
  genericInValidLogin,
  genericUnAuthorized,
  payload,
  testSchema,
  testObj
} from '../fixtures/helpers';

const { SECRET } = config;

const {
  AuthHelper: { hashString, compareHash, generateToken, verifyToken },
  GenericHelper: { generateId, validateInput, calcPages }
} = Helpers;

describe('Basic Utility Functions', () => {
  let salter;
  let hasher;
  let token;
  it('should generate uuid', () => {
    const id = generateId();
    expect(id).to.be.a('string').of.length(21);
  });
  it('should generate a string token of with plenty characters', () => {
    token = generateToken({ payload }, '15m');
    expect(token).to.be.a('string').of.length.greaterThan(29);
  });
  it('should return decoded payload', () => {
    const payloadGotten = verifyToken(token, SECRET);
    expect(payloadGotten.payload).to.be.a('string').and.equal(payload);
  });
  it('should return true when the hash value generated from a string is used together with its salt value to verify its authenticity', async () => {
    const { salt, hash } = await hashString(originText);
    salter = salt;
    hasher = hash;
    const isTrue = compareHash(originText, hash, salt);
    expect(isTrue).to.eql(true);
  });
  it('should return false when a string is compared with the hash and salt values of another string', () => {
    const isTrue = compareHash(wrongText, hasher, salter);
    expect(isTrue).to.eql(false);
  });
  it('should return a generic error object when no arguments is passed to the constructor while instantiating the custom Api Error class', () => {
    const error = new ApiError();
    expect(error).to.include(genericErrorObj);
  });
  it('should return a custom 404 error object when the generic notFoundApi object is used', () => {
    expect(genericErrors.notFoundApi).to.include(genericNotFound);
  });
  it('should return a custom 404 error object when the generic notFoundApi object is used', () => {
    expect(genericErrors.notFoundApi).to.include(genericNotFound);
  });
  it('should return a custom 401 error object which indicates invalid authentication token when the generic authRequired object is used', () => {
    expect(genericErrors.authRequired).to.include(genericAuthRequired);
  });
  it('should return the custom 401 error object which indicates an invalid login credential when the generic inValidLogin object is used', () => {
    expect(genericErrors.inValidLogin).to.include(genericInValidLogin);
  });
  it('should return the custom 403 error object which indicates a higher access level is required when the generic UnAuthorized object is used', () => {
    expect(genericErrors.unAuthorized).to.include(genericUnAuthorized);
  });
  it('should return the right amount of pages and limit', () => {
    const page = calcPages(8, 2);
    expect(page).to.equal(4);
  });
  it('should return the right amount of page when limit is more than pages available', () => {
    const page = calcPages(8, 16);
    expect(page).to.equal(1);
  });
  it('should pass validations', () => {
    try {
      validateInput(testSchema, testObj);
    } catch (error) {
      expect(error).to.be.equal(null);
    }
  });
});
