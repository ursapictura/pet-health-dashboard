import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleVisit } from '../../../api/visitData';
import VisitForm from '../../../components/forms/VisitForm';

export default function EditVisit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVisit(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<VisitForm obj={editItem} />);
}
