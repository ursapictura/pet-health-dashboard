import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import WeightChart from '../../components/WeightChart';
import WeightForm from '../../components/forms/WeightForm';
import PetCard from '../../components/PetCard';
import { getSinglePet } from '../../api/petData';

export default function PetDashboard() {
  const router = useRouter();
  const [weights, setWeights] = useState([]);
  const [pet, setPet] = useState({});

  const { firebaseKey } = router.query;

  const getPet = () => {
    getSinglePet(firebaseKey).then(setPet);
  };

  useEffect(() => {
    getPet();
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
    </div>
  );
}
