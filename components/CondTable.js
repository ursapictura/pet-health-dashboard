import { PropTypes } from 'prop-types';
import CondRow from './CondRow';

export default function CondTable({ conditions, onUpdate }) {
  const sortConditions = conditions.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-x-auto med-con-table">
      <h2 className="title">Medical Conditions</h2>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Conditions</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {sortConditions.map((condition) => ( // eslint-disable-line
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
