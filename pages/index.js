// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getAllPets } from '../api/petData';
import PetCard from '../components/PetCard';
import WeightChart from '../components/WeightChart';

function Home() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  const getAllThePets = () => {
    getAllPets(user.uid).then(setPets);
    console.warn(user.uid);
  };

  useEffect(() => {
    getAllThePets();
  }, []);

  return (
    <div>
      <Link href="/pet/new" passHref>
        <Button>Add A Pet</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {pets.map((pet) => (
          <PetCard key={pet.firebaseKey} petObj={pet} onUpdate={getAllThePets} />
        ))}
      </div>
      <WeightChart petId="-NyByE10NtuTlg8a3faj" />
    </div>
  );
}

export default Home;
