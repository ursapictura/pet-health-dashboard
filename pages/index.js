// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getAllPets } from '../api/petData';
import PetCard from '../components/PetCard';

function Home() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  const getAllThePets = () => {
    getAllPets(user.uid).then(setPets);
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
          <PetCard key={pet.firebaseKey} petObj={pet} onUpdate={getAllThePets} location="index" />
        ))}
      </div>
    </div>
  );
}

export default Home;
