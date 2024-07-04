import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllConditions = (petId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/conditions.json?orderBy="petId"&equalTo="${petId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleCondition = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/conditions/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCondition = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/conditions.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateCondition = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/conditions/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteCondition = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/conditions/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllConditions,
  getSingleCondition,
  createCondition,
  updateCondition,
  deleteCondition,
};
