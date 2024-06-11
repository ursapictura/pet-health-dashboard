import { deleteCondition, getAllConditions } from './conData';
import { deleteMed, getAllMeds } from './medData';
import { deletePet } from './petData';
import { deleteVisit, getAllVisits } from './visitData';
import { deleteSingleWeight, getAllWeights } from './weightData';

const deletePetData = (petId) => new Promise((resolve, reject) => {
  getAllWeights(petId)
    .then((weightArray) => {
      const deleteWeightPromises = weightArray.map((weight) => deleteSingleWeight(weight.firebaseKey));
      return Promise.all(deleteWeightPromises);
    })
    .then(() => getAllConditions(petId))
    .then((conditionArray) => {
      const deleteConditionPromises = conditionArray.map((condition) => deleteCondition(condition.firebaseKey));
      return Promise.all(deleteConditionPromises);
    })
    .then(() => getAllMeds(petId))
    .then((medicationArray) => {
      const deleteMedicationPromises = medicationArray.map((medication) => deleteMed(medication.firebaseKey));
      return Promise.all(deleteMedicationPromises);
    })
    .then(() => getAllVisits(petId))
    .then((visitArray) => {
      const deleteVisitPromises = visitArray.map((visit) => deleteVisit(visit.firebaseKey));
      return Promise.all(deleteVisitPromises);
    })
    .then(() => deletePet(petId))
    .then(resolve)
    .catch(reject);
});

export default deletePetData;
