import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { deletePet } from '../api/petData';

export default function PetCard({ petObj, onUpdate, location }) {
  const removeThisPet = () => {
    if (window.confirm(`Remove ${petObj.name} from app?`)) {
      deletePet(petObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card border="success" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={petObj.image} alt={petObj.name} />
      <Card.Body>
        <Card.Title>{petObj.name}</Card.Title>
        <h4>{petObj.breed}</h4>
        <h5>Microchip: {petObj.microchip}</h5>
        <h5>DOB: {petObj.birthday}</h5>
        <h5>Insurance: {petObj.insurance}</h5>
        <h5>{petObj.appearance}</h5>
        {/* DYNAMIC LINK TO VIEW THE PET DASHBOARD  */}
        {location === 'index'
          ? (
            <Link href={`/pet/${petObj.firebaseKey}`} passHref>
              <Button variant="primary" className="m-2">VIEW</Button>
            </Link>
          )
          : '' }
        {/* DYNAMIC LINK TO EDIT THE PET DETAILS  */}
        <Link href={`/pet/edit/${petObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={removeThisPet} className="m-2">
          REMOVE
        </Button>
      </Card.Body>
    </Card>
  );
}

PetCard.propTypes = {
  petObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    microchip: PropTypes.string,
    firebaseKey: PropTypes.string,
    appearance: PropTypes.string,
    insurance: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};
