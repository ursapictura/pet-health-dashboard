import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllMeds = (petId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medications.json?orderBy="petId"&equalTo="${petId}"`, {
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

const getSingleMed = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medications/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createMed = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medications.json`, {
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

const updateMed = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medications/${payload.firebaseKey}.json`, {
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

const deleteMed = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medications/${firebaseKey}.json`, {
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
  getAllMeds,
  getSingleMed,
  createMed,
  updateMed,
  deleteMed,
};
