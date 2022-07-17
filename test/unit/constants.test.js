/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { constants } from '../../app/utils';
import { randomResource } from '../fixtures/constants';

const {
  RESOURCE_ALREADY_EXIST,
  RESOURCE_CREATE_ERROR_STATUS,
  RESOURCE_EXIST_VERIFICATION_FAIL,
  RESOURCE_EXIST_VERIFICATION_FAIL_MSG,
  RESOURCE_CREATE_ERROR,
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_NOT_FOUND,
  RESOURCE_UPDATE_FAIL,
  RESOURCE_UPDATE_FAIL_STATUS,
  RESOURCE_UPDATE_SUCCESS,
  PARAM_ABSENT,
  RESOURCE_FETCH_SUCCESS,
  RESOURCE_NOT_PROVIDED,
  FETCH_DATA_ERROR_MSG,
  RESOURCE_FETCH_ERROR_STATUS,
  RESOURCE_DELETE_FAIL,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_DELETE_FAIL_STATUS
} = constants;

describe('Basic Constants Functions', () => {
  it('Param absent', () => {
    const data = PARAM_ABSENT(randomResource);
    expect(data).to.equal(`Please provide a valid ${randomResource}`);
  });
  it('RESOURCE_UPDATE_SUCCESS', () => {
    const data = RESOURCE_UPDATE_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} updated successfully`);
  });
  it('RESOURCE_UPDATE_FAIL_STATUS', () => {
    const data = RESOURCE_UPDATE_FAIL_STATUS(randomResource);
    expect(data).to.equal(`${randomResource}_UPDATE_FAIL`);
  });
  it('RESOURCE_UPDATE_FAIL', () => {
    const data = RESOURCE_UPDATE_FAIL(randomResource);
    expect(data).to.equal(`Error while updating ${randomResource}`);
  });
  it('RESOURCE_NOT_FOUND', () => {
    const data = RESOURCE_NOT_FOUND(randomResource);
    expect(data).to.equal(`${randomResource} not found`);
  });
  it('RESOURCE_CREATE_SUCCESS', () => {
    const data = RESOURCE_CREATE_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} created successfully`);
  });
  it('RESOURCE_CREATE_ERROR', () => {
    const data = RESOURCE_CREATE_ERROR(randomResource);
    expect(data).to.equal(`Failed to create ${randomResource}. It is not you, it is us.`);
  });
  it('RESOURCE_EXIST_VERIFICATION_FAIL_MSG', () => {
    const data = RESOURCE_EXIST_VERIFICATION_FAIL_MSG(randomResource);
    expect(data).to.equal(`Error trying to fetch ${randomResource}. It is not you, it is us.`);
  });
  it('RESOURCE_EXIST_VERIFICATION_FAIL', () => {
    const data = RESOURCE_EXIST_VERIFICATION_FAIL(randomResource);
    expect(data).to.equal(`${randomResource}_EXIST_VERIFICATION_FAIL`);
  });
  it('RESOURCE_CREATE_ERROR_STATUS', () => {
    const data = RESOURCE_CREATE_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource}_CREATE_ERROR`);
  });
  it('RESOURCE_ALREADY_EXIST', () => {
    const data = RESOURCE_ALREADY_EXIST(randomResource);
    expect(data).to.equal(`${randomResource} exists already`);
  });
  it('RESOURCE_NOT_PROVIDED', () => {
    const data = RESOURCE_NOT_PROVIDED(randomResource);
    expect(data).to.equal(`No ${randomResource} provided`);
  });
  it('FETCH_DATA_ERROR_MSG', () => {
    const data = FETCH_DATA_ERROR_MSG(randomResource);
    expect(data).to.equal(`Error retrieving ${randomResource}. This is from us not you`);
  });
  it('RESOURCE_FETCH_SUCCESS', () => {
    const data = RESOURCE_FETCH_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} fetched successfully`);
  });
  it('RESOURCE_FETCH_ERROR_STATUS', () => {
    const data = RESOURCE_FETCH_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource}_FETCH_ERROR`);
  });
  it('RESOURCE_DELETE_SUCCESS', () => {
    const data = RESOURCE_DELETE_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} deleted successfully`);
  });
  it('RESOURCE_DELETE_FAIL', () => {
    const data = RESOURCE_DELETE_FAIL(randomResource);
    expect(data).to.equal(`Error while deleting ${randomResource}`);
  });
  it('RESOURCE_DELETE_FAIL_STATUS', () => {
    const data = RESOURCE_DELETE_FAIL_STATUS(randomResource);
    expect(data).to.equal(`ERROR DELETING ${randomResource}`);
  });
});
