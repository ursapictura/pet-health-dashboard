import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPet, updatePet } from '../../api/petData';

const initialState = {
  name: '',
  image: '',
  breed: '',
  species: '',
  appearance: '',
  microchip: '',
  birthday: '',
  insurance: '',
  fixed: false,
};

function PetForm({ obj }) {
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
      updatePet(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPet(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePet(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Pet</h2>

      {/* PET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pet Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter pet's name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PET IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Pet Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PET BREED INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Pet Breed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter pet's breed"
          name="breed"
          value={formInput.breed}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SPECIES SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="species">
        <Form.Select
          aria-label="species"
          name="species"
          onChange={handleChange}
          className="mb-3"
          value={formInput.species}
          required
        >
          <option value="">Select Pet Species</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="rabbit">Rabbit</option>
          <option value="ferret">Ferret</option>
          <option value="rodent">Rodent</option>
          <option value="snake">Snake</option>
        </Form.Select>
      </FloatingLabel>

      {/* PET APPEARANCE TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="appearance" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="appearance"
          style={{ height: '100px' }}
          name="appearance"
          value={formInput.appearance}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PET MICROCHIP INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Pet Microchip Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter pet's microchip number"
          name="microchip"
          value={formInput.microchip}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* PET BIRTHDAY INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Pet Birthday" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Pet's estimated birth date"
          name="birthday"
          value={formInput.birthday}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PET INSURANCE INPUT  */}
      <FloatingLabel controlId="floatingInput6" label="Pet Insurance" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter pet's insurance carrier"
          name="insurance"
          value={formInput.insurance}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* PET FIXED BOOLEAN */}
      <Form.Check
        className="mb-3"
        type="switch"
        id="fixed"
        name="fixed"
        label="Spayed/nuetered?"
        checked={formInput.fixed}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            fixed: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Pet</Button>
    </Form>
  );
}

PetForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    breed: PropTypes.string,
    fixed: PropTypes.bool,
    species: PropTypes.string,
    appearance: PropTypes.string,
    mircohip: PropTypes.string,
    birthday: PropTypes.string,
    incurance: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PetForm.defaultProps = {
  obj: initialState,
};

export default PetForm;
