import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVet, updateVet } from '../../api/vetData';

const initialState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  image: '',
};

function VetForm({ obj }) {
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
      updateVet(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVet(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVet(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Veterinarian</h2>

      {/* VET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Vet Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter vet's name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VET IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Vet Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VET PHONE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Phone" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter vet's phone number"
          name="phone"
          value={formInput.phone}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VET ADDRESS  */}
      <FloatingLabel controlId="floatingTextarea" label="Address" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="address"
          style={{ height: '100px' }}
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VET EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Vet Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter vet's email address"
          name="email"
          value={formInput.email}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Vet</Button>
    </Form>
  );
}

VetForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

VetForm.defaultProps = {
  obj: initialState,
};

export default VetForm;
