import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllWeights = (petId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/weight.json?orderBy="petId"&equalTo="${petId}"`, {
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

const getSingleWeight = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/weight/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createWeight = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/weight.json`, {
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

const updateWeight = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/weight/${payload.firebaseKey}.json`, {
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

const deleteSingleWeight = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/weight/${firebaseKey}.json`, {
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
  getAllWeights,
  getSingleWeight,
  createWeight,
  updateWeight,
  deleteSingleWeight,
};
