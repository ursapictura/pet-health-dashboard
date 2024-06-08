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

export default function PetDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [pet, setPet] = useState({});
  const [weights, setWeights] = useState([]);
  const [vets, setVets] = useState([]);

  const { firebaseKey } = router.query;

  const getPet = () => {
    getSinglePet(firebaseKey).then(setPet);
  };

  useEffect(() => {
    getPet();
  }, []);

  const getPrimaryVet = () => {
    getUserVet(user.uid).then(setVets);
    console.warn(vets);
  };

  useEffect(() => {
    getPrimaryVet();
  }, []);

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
    </div>
  );
}
