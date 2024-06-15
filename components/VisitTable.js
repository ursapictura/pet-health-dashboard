import { PropTypes } from 'prop-types';
import VisitRow from './VisitRow';

export default function VisitTable({ visits, onUpdate }) {
  const sortVisits = visits.sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="overflow-x-auto visit-table">
      <h2 className="title">Veterinary Visits</h2>
      <table className="table table-xs">
        <thead>

          <tr>
            <th>Reason</th>
            <th>Diagnosis</th>
            <th>Date</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {sortVisits.map((visit) => ( // eslint-disable-line
            <VisitRow key={visit.firebaseKey} visitObj={visit} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

VisitTable.propTypes = {
  visits: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
