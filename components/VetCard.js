/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { PropTypes } from 'prop-types';

export default function VetCard({ vetObj }) {
  return (
    <div className="card w-94 glass vet-card">
      <h2 className="title">Primary Vet</h2>
      <figure className="px-10 pt-10"><img src={vetObj.image} alt={vetObj.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{vetObj.name}</h2>
        <h4>{vetObj.phone}</h4>
        <h5>{vetObj.address}</h5>
        <h5>{vetObj.email}</h5>
        {/* DYNAMIC LINK TO EDIT THE PET DETAILS  */}
        <a href={`/vet/edit/${vetObj.firebaseKey}`}>
          <button type="submit" className="btn btn-outline btn-secondary">EDIT</button>
        </a>
      </div>
    </div>
  );
}

VetCard.propTypes = {
  vetObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
