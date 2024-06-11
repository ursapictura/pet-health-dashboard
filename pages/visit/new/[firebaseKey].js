import React from 'react';
import { useRouter } from 'next/router';
import VisitForm from '../../../components/forms/VisitForm';

export default function AddVisit() {
  const router = useRouter();

  const { firebaseKey } = router.query;

  return (
    <>
      <VisitForm petId={firebaseKey} />
    </>
  );
}
