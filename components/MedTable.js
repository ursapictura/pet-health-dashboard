import { PropTypes } from 'prop-types';
import MedRow from './MedRow';

export default function MedTable({ meds, onUpdate }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="title">Current Medications</h2>
      <table className="table table-xs">
        <thead>

          <tr>
            <th>Medications</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {meds.map((med) => ( // eslint-disable-line
            <MedRow key={med.firebaseKey} medObj={med} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

MedTable.propTypes = {
  meds: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
