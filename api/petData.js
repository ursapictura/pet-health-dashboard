import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllPets = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSinglePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json`, {
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

const updatePet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${payload.firebaseKey}.json`, {
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

const deletePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${firebaseKey}.json`, {
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
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet,
};
