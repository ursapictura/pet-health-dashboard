import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import WeightChart from '../../components/WeightChart';
import WeightForm from '../../components/forms/WeightForm';
import PetCard from '../../components/PetCard';
import { getSinglePet } from '../../api/petData';
import { getUserVet } from '../../api/vetData';
import VetCard from '../../components/VetCard';
import { useAuth } from '../../utils/context/authContext';
import { getAllMeds } from '../../api/medData';
import MedTable from '../../components/MedTable';
import { getAllConditions } from '../../api/conData';
import CondTable from '../../components/CondTable';

export default function PetDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [pet, setPet] = useState({});
  const [weights, setWeights] = useState([]);
  const [vets, setVets] = useState([]);
  const [meds, setMeds] = useState([]);
  const [conditions, setConditions] = useState([]);

  const { firebaseKey } = router.query;

  const getPet = () => {
    getSinglePet(firebaseKey).then(setPet);
  };

  const getPrimaryVet = () => {
    getUserVet(user.uid).then(setVets);
    console.warn(vets);
  };

  const GetPetMeds = () => {
    getAllMeds(firebaseKey).then(setMeds);
  };

  const GetPetConditions = () => {
    getAllConditions(firebaseKey).then(setConditions);
  };

  useEffect(() => {
    getPet();
    getPrimaryVet();
    GetPetMeds();
    GetPetConditions();
  }, [firebaseKey, user.uid]);

  return (
    <div className="dashboard">
      <div className="pet-dashboard-card">
        <PetCard key={firebaseKey} petObj={pet} onUpdate={getPet} location="dashboard" />
      </div>
      <div className="chart">
        <WeightChart weights={weights} />
        <WeightForm obj={firebaseKey} setWeights={setWeights} />
      </div>
      <div className="vet-card">
        {vets.length > 0 ? (vets.map((vet) => (<VetCard key={vet.firebaseKey} vetObj={vet} />))) : (
          <Link
            href="/vet/new"
            passHref
            style={{
              display: 'block',
              width: '125px',
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <button type="submit" className="btn btn-primary">Add Primary Vet</button>
          </Link>
        )}
      </div>
      <div>
        {meds.length > 0 ? (<MedTable meds={meds} onUpdate={GetPetMeds} />) : ''}
      </div>
      <div>
        {conditions.length > 0 ? (<CondTable conditions={conditions} onUpdate={GetPetConditions} />) : ''}
      </div>
      <div className="btn-container">
        <Link
          href={`/med/new/${pet.firebaseKey}`}
          passHref
          style={{
            display: 'block',
            width: '125px',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <button type="submit" className="btn btn-primary">Add Medication</button>
        </Link>
        <Link
          href={`/condition/new/${pet.firebaseKey}`}
          passHref
          style={{
            display: 'block',
            width: '125px',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <button type="submit" className="btn btn-primary">Add Condition</button>
        </Link>
      </div>
    </div>
  );
}
