import { PropTypes } from 'prop-types';
import { deleteMed } from '../api/medData';

export default function MedRow({ medObj, onUpdate }) {
  const removeThisMed = () => {
    if (window.confirm(`Remove ${medObj.name} from app?`)) {
      deleteMed(medObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <tr>
      <th>{medObj.name}</th>
      <td>
        <button type="submit" className="btn btn-outline btn-accent btn-xs" onClick={removeThisMed}>
          REMOVE
        </button>
      </td>
    </tr>
  );
}

MedRow.propTypes = {
  medObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
