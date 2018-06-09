import axios from 'axios';
import {heroesUrl} from './config';

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
 * Fetches heroesList from an api
 *
 * @returns {Promise} - Promise object represents operation result
 */
export const fetchHeroesList = () =>
  axios
    .get(heroesUrl)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while fetching',
      }),
    )
    .catch(handlePromiseError);

/**
 * Adds hero to heroesList
 *
 * @param {Object} hero - new hero
 * @returns {Promise} - Promise object represents operation result
 */
export const addHero = hero =>
  axios
    .post(heroesUrl, hero)
    .then(response =>
      processApiResponse({
        response,
        successCode: 201,
        errorMessage: 'Error while adding',
      }),
    )
    .catch(handlePromiseError);

/**
 * Removes a hero by id
 *
 * @param {Number} id - hero id
 * @returns {Promise} - Promise object represents operation result
 */
export const deleteHero = id =>
  axios
    .delete(`${heroesUrl}/${id}`)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while deleting',
      }),
    )
    .catch(handlePromiseError);

/**
 * Updates hero
 *
 * @param {Object} hero - hero to be updated
 * @returns {Promise} - Promise object represents operation result
 */
export const updateHero = hero =>
  axios
    .put(`${heroesUrl}/${hero.id}`, hero)
    .then(response =>
      processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'Error while updating',
      }),
    )
    .catch(handlePromiseError);
