import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { deleteVisit, getSingleVisit } from '../../api/visitData';

export default function ViewVisit() {
  const [visit, setVisit] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getPetVisit = () => {
    getSingleVisit(firebaseKey).then(setVisit);
  };

  const removeThisVisit = () => {
    if (window.confirm('Remove this visit from app?')) {
      deleteVisit(firebaseKey).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getPetVisit();
  }, [firebaseKey]);

  return (
    <>
      <h1>Visit Date: {visit.date}</h1>
      <h2>Reason: {visit.reason}</h2>
      <h2>Diagnosis: {visit.diagnosis}</h2>
      <h3>Vet: {visit.vet}</h3>
      <div>
        {visit.medications !== '' > 0 ? <h3>Medications Prescribed: {visit.medications}</h3> : ''}
      </div>
      <div>
        {visit.test !== '' ? <h3>Tests Performed: {visit.tests}</h3> : ''}
      </div>
      <h3> Vaccinations Administered? {visit.vaccinations}</h3>
      <a href={`/visit/edit/${firebaseKey}`}>
        <button type="submit" className="btn btn-outline btn-secondary">EDIT</button>
      </a>
      <button type="submit" className="btn btn-outline btn-accent" onClick={removeThisVisit}>
        REMOVE
      </button>
    </>
  );
}
