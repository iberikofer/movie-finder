import React, { useState, useEffect, useRef } from 'react';
import css from './MoviePoster.module.css';

interface MoviePosterProps {
  src: string;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const FALLBACK_POSTER = 'https://placehold.co/342x513/2a2a2a/ffffff?text=No+Poster';

export const MoviePoster: React.FC<MoviePosterProps> = ({
  src,
  alt = 'Media poster',
  className = '',
  loading = 'lazy',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_POSTER);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_POSTER);
  }, [src]);

  useEffect(() => {
    // If the image is already cached and loaded by the browser
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [currentSrc]);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`${className} ${css.poster} ${isLoaded ? css.loaded : css.loading}`}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (currentSrc !== FALLBACK_POSTER) {
          setCurrentSrc(FALLBACK_POSTER);
        }
        setIsLoaded(true);
      }}
    />
  );
};
