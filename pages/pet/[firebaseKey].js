import { useRouter } from 'next/router';
import WeightChart from '../../components/WeightChart';
import WeightForm from '../../components/forms/WeightForm';

export default function PetDashboard() {
  const router = useRouter();

  const { firebaseKey } = router.query;

  return (
    <div>
      <WeightChart petId={firebaseKey} />
      <WeightForm obj={firebaseKey} />
    </div>
  );
}
