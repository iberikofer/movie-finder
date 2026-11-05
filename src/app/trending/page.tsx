import { Suspense } from 'react';
import Trending from '../../views/Trending';
import Loader from '../../components/Loader/Loader';

export default function TrendingPage() {
  return (
    <Suspense fallback={<Loader isCentered caption="Loading trending..." />}>
      <Trending />
    </Suspense>
  );
}
