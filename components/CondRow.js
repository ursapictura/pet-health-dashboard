import { PropTypes } from 'prop-types';
import { deleteCondition } from '../api/conData';

export default function CondRow({ conditionObj, onUpdate }) {
  const removeThisCondition = () => {
    if (window.confirm(`Remove ${conditionObj.name} from app?`)) {
      deleteCondition(conditionObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <tr>
      <th>{conditionObj.name}</th>
      <td>
        <button type="submit" className="btn btn-outline btn-accent btn-xs" onClick={removeThisCondition}>
          REMOVE
        </button>
      </td>
    </tr>
  );
}

CondRow.propTypes = {
  conditionObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
