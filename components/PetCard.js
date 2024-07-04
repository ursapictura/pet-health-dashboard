/* eslint-disable @next/next/no-img-element */
import { PropTypes } from 'prop-types';
import deletePetData from '../api/mergeData';

export default function PetCard({ petObj, onUpdate, location }) {
  const deleteThisPet = () => {
    if (window.confirm(`Remove ${petObj.name} from app?`)) {
      deletePetData(petObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="card w-93 glass pet-card">
      <figure className="px-10 pt-10"><img src={petObj.image} alt={petObj.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{petObj.name}</h2>
        <h4>{petObj.breed}</h4>
        <h5>Microchip: {petObj.microchip}</h5>
        <h5>DOB: {petObj.birthday}</h5>
        <h5>Insurance: {petObj.insurance}</h5>
        <h5>{petObj.appearance}</h5>
        {/* DYNAMIC LINK TO VIEW THE PET DASHBOARD  */}
        <div className="btn-container">
          {location === 'index'
            ? (
              <a href={`/pet/${petObj.firebaseKey}`}>
                <button type="submit" className="btn btn-outline btn-primary">VIEW</button>
              </a>
            )
            : '' }
          {/* DYNAMIC LINK TO EDIT THE PET DETAILS  */}
          <a href={`/pet/edit/${petObj.firebaseKey}`}>
            <button type="submit" className="btn btn-outline btn-secondary">EDIT</button>
          </a>
          <button type="submit" className="btn btn-outline btn-accent" onClick={deleteThisPet}>
            REMOVE
          </button>
        </div>
      </div>
    </div>
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
