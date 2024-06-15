import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createWeight, updateWeight, getAllWeights } from '../../api/weightData';

const initialState = {
  weight: '',
};
// eslint-disable-next-line
function WeightForm({ obj, setWeights }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getAllPetWeights = () => {
    getAllWeights(obj).then((array) => setWeights(array));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, petId: obj, date: Date.now() };
    createWeight(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateWeight(patchPayload).then(getAllPetWeights);
    });
    setFormInput(initialState);
  };

  useEffect(() => {
    getAllPetWeights();
  }, []);

  return (
    <Form className="weight-form" onSubmit={handleSubmit}>

      {/* PET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pet Weight" className="mb-3 weight-input">
        <Form.Control
          type="number"
          placeholder="Enter pet's weight"
          name="weight"
          value={formInput.weight}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <button type="submit" className="btn btn-outline btn-primary">Add Weight</button>
    </Form>
  );
}
WeightForm.propTypes = {
  obj: PropTypes.string,
};

WeightForm.defaultProps = {
  obj: initialState,
};

export default WeightForm;
