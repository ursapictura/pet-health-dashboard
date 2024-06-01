/* eslint-disable @next/next/no-html-link-for-pages */
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
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
    <div className="home">
      <a
        href="/pet/new"
        style={{
          display: 'block',
          width: '125px',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <button type="submit" className="btn btn-primary">Add A Pet</button>
      </a>
      <div className="card-container">
        {pets.map((pet) => (
          <PetCard key={pet.firebaseKey} petObj={pet} onUpdate={getAllThePets} location="index" />
        ))}
      </div>
    </div>
  );
}

export default Home;
