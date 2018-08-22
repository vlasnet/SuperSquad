import axios from 'axios';
import {squadsUrl} from './config';

/**
 * Handles promise errors by loggin them to console
 *
 * @param {Object} error
 */
const handlePromiseError = error => console.log(`Error: ${error}`);

/**
 * Handles api response
 *
 * @param {object} response - api resonse object
 * @param {Number} successCode - successful api response code
 * @param {String} errorMessage
 */
const processApiResponse = ({ response, successCode, errorMessage }) => ({
  data: response.data,
  error: response.status === successCode ? null : errorMessage,
});

/**
 * Fetches squadsList from an api
 *
 * @returns {Promise} - Promise object represents operation result
 */
export const fetchSquadsList = () =>
  axios
    .get(squadsUrl)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while fetching',
      }),
    )
    .catch(handlePromiseError);

/**
 * Adds squad to squadsList
 *
 * @param {Object} squad - squad hero
 * @returns {Promise} - Promise object represents operation result
 */
export const addSquad = squad =>
  axios
    .post(squadsUrl, squad)
    .then(response =>
      processApiResponse({
        response,
        successCode: 201,
        errorMessage: 'Error while adding',
      }),
    )
    .catch(handlePromiseError);

/**
 * Removes a squad by id
 *
 * @param {Number} id - squad id
 * @returns {Promise} - Promise object represents operation result
 */
export const deleteSquad = id =>
  axios
    .delete(`${squadsUrl}/${id}`)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while deleting',
      }),
    )
    .catch(handlePromiseError);

/**
 * Updates squad
 *
 * @param {Object} squad - squad to be updated
 * @returns {Promise} - Promise object represents operation result
 */
export const updateSquad = squad =>
  axios
    .put(`${squadsUrl}/${squad.id}`, squad)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while updating',
      }),
    )
    .catch(handlePromiseError);
