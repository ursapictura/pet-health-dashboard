import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVisit, updateVisit } from '../../api/visitData';

const initialState = {
  reason: '',
  date: '',
  vet: '',
  diagnosis: '',
  medications: '',
  tests: '',
  vaccinations: false,
};

function VisitForm({ petId, obj }) {
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
      const payload = { ...formInput, petId };
      createVisit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVisit(patchPayload).then(() => {
          router.push(`/pet/${petId}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Visit</h2>

      {/* VISIT REASON INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Reason for Visit" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Describe reason for vet visit"
          name="reason"
          value={formInput.reason}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Vet's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name of vet"
          name="vet"
          value={formInput.vet}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DATE OF VISIT INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Date of Visit" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Enter date of vet visit"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DIAGNOSIS INPUT */}
      <FloatingLabel controlId="floatingInput5" label="Diagnosis" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Diagnosis"
          name="diagnosis"
          value={formInput.diagnosis}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* MEDICATION INPUT  */}
      <FloatingLabel controlId="floatingInput6" label="Medications Prescribed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Medications Prescribed"
          name="medications"
          value={formInput.medications}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* TESTS INPUT  */}
      <FloatingLabel controlId="floatingInput7" label="Tests Performed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tests Performed"
          name="tests"
          value={formInput.tests}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* VACCINATIONS BOOLEAN */}
      <Form.Check
        className="mb-3"
        type="switch"
        id="vaccinations"
        name="vaccinations"
        label="Annual Vaccinations?"
        checked={formInput.vaccinations}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            vaccinations: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Visit</Button>
    </Form>
  );
}

VisitForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    vet: PropTypes.string,
    diagnosis: PropTypes.string,
    medications: PropTypes.string,
    tests: PropTypes.string,
    vaccinations: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
  petId: PropTypes.string.isRequired,
};

VisitForm.defaultProps = {
  obj: initialState,
};

export default VisitForm;
