import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleVet } from '../../../api/vetData';
import VetForm from '../../../components/forms/VetForm';

export default function EditVet() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVet(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<VetForm obj={editItem} />);
}
