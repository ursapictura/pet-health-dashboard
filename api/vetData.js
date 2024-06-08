import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserVet = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vet.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSingleVet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vet/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createVet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vet.json`, {
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

const updateVet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vet/${payload.firebaseKey}.json`, {
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

export {
  getUserVet,
  getSingleVet,
  createVet,
  updateVet,
};
