import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllVisits = (petId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/visits.json?orderBy="petId"&equalTo="${petId}"`, {
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

const getSingleVisit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/visits/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createVisit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/visits.json`, {
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

const updateVisit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/visits/${payload.firebaseKey}.json`, {
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

const deleteVisit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/visits/${firebaseKey}.json`, {
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
  getAllVisits,
  getSingleVisit,
  createVisit,
  updateVisit,
  deleteVisit,
};
