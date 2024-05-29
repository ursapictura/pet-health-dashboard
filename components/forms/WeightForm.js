import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-5">Add Weight</h2>

      {/* PET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pet Weight" className="mb-3">
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
      <Button type="submit">Add Weight</Button>
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
