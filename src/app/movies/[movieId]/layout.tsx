import { Suspense } from 'react';
import MovieDetails from '../../../components/MovieDetails/MovieDetails';
import Loader from '../../../components/Loader/Loader';

export default function MovieDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader isCentered caption="Loading movie details..." />}>
      <MovieDetails>{children}</MovieDetails>
    </Suspense>
  );
}

