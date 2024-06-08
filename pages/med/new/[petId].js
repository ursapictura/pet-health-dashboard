import React from 'react';
import { useRouter } from 'next/router';
import MedForm from '../../../components/forms/MedForm';

export default function AddMed() {
  const router = useRouter();

  const { petId } = router.query;

  return (<MedForm petId={petId} />);
}
