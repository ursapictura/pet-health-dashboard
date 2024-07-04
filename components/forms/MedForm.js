import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMed, updateMed } from '../../api/medData';

const initialState = {
  name: '',
};

function MedForm({ petId, obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMed(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, petId };
      createMed(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMed(patchPayload).then(() => {
          router.push(`/pet/${petId}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Medication</h2>

      {/* MEDICATION NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Medication Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter name of medication"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Med</Button>
    </Form>
  );
}

MedForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  petId: PropTypes.string.isRequired,
};

MedForm.defaultProps = {
  obj: initialState,
};

export default MedForm;
