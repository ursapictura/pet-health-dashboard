import { PropTypes } from 'prop-types';

export default function VisitRow({ visitObj }) {
  return (
    <tr>
      <th>{visitObj.reason}</th>
      <td>{visitObj.diagnosis}</td>
      <td>{visitObj.date}</td>
      <td>
        <a href={`/visit/${visitObj.firebaseKey}`}>
          <button type="submit" className="btn btn-outline btn-primary  btn-xs">VIEW</button>
        </a>
      </td>
    </tr>
  );
}

VisitRow.propTypes = {
  visitObj: PropTypes.shape({
    reason: PropTypes.string,
    diagnosis: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
