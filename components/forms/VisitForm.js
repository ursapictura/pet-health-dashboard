import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVisit, updateVisit } from '../../api/visitData';

const initialState = {
  vet: '',
  date: '',
  tests: '',
  diagnosis: '',
  medications: '',
  vaccinations: false,
  image: '',
};

function VisitForm({ obj }) {
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
      updateVisit(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVisit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVisit(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Vet Visit</h2>

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

      {/* DATE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="date" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Date of visit"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TESTS INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Tests Performed" className="mb-3">
        <Form.Control
          type="textarea"
          placeholder="Enter tests performed"
          style={{ height: '100px' }}
          name="tests"
          value={formInput.tests}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DIAGNOSIS INPUT  */}
      <FloatingLabel controlId="floatingTextarea" label="diagnosis" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Vet diagnosis"
          style={{ height: '100px' }}
          name="diagnosis"
          value={formInput.diagnosis}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* MEDICATIONS INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Meds prescribed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Medications prescribed"
          name="email"
          value={formInput.medications}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* PET VACCINATIONS BOOLEAN */}
      <Form.Check
        className="mb-3"
        type="switch"
        id="vaccines"
        name="vaccines"
        label="Vaccinations?"
        checked={formInput.vaccinations}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            fixed: e.target.checked,
          }));
        }}
      />

      {/* RECEIPT IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Receipt Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Visit</Button>
    </Form>
  );
}

VisitForm.propTypes = {
  obj: PropTypes.shape({
    vet: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    tests: PropTypes.string,
    diagnosis: PropTypes.string,
    medications: PropTypes.string,
    vaccinations: PropTypes.bool,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

VisitForm.defaultProps = {
  obj: initialState,
};

export default VisitForm;
