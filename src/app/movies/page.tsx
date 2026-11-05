import { Suspense } from 'react';
import Movies from '../../views/Movies';
import Loader from '../../components/Loader/Loader';

export default function MoviesPage() {
  return (
    <Suspense fallback={<Loader isCentered caption="Loading search..." />}>
      <Movies />
    </Suspense>
  );
}
