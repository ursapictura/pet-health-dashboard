import { PropTypes } from 'prop-types';
import MedRow from './MedRow';

export default function MedTable({ meds, onUpdate }) {
  const sortMeds = meds.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-x-auto med-con-table">
      <h2 className="title">Current Medications</h2>
      <table className="table table-xs">
        <thead>

          <tr>
            <th>Medications</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {console.warn(sortMeds)}
          {sortMeds.map((med) => ( // eslint-disable-line
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
