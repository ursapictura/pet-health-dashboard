import React from 'react';
import { useRouter } from 'next/router';
import ConditionForm from '../../../components/forms/ConditionsForm';

export default function AddCondition() {
  const router = useRouter();

  const { petId } = router.query;

  return (<ConditionForm petId={petId} />);
}
