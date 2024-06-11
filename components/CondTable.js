import { PropTypes } from 'prop-types';
import CondRow from './CondRow';

export default function CondTable({ conditions, onUpdate }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="title">Medical Conditions</h2>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Conditions</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition) => ( // eslint-disable-line
            <CondRow key={condition.firebaseKey} conditionObj={condition} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

CondTable.propTypes = {
  conditions: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
