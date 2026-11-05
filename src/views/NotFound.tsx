'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import ClapperboardLoader from '../components/Loader/ClapperboardLoader';
import { setHasLoadedHomeOnce } from './Home';
import css from './NotFound.module.css';

type InitialStage = 'loading' | 'crossfade' | 'ready';
type ExitStage = 'idle' | 'fadingOut' | 'loaderVisible';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [initialStage, setInitialStage] = useState<InitialStage>('loading');
  const [exitStage, setExitStage] = useState<ExitStage>('idle');

  useEffect(() => {
    document.title = 'Movie Finder | 404';

    // 1. Initial loader plays for 1000ms (reduced in half from 2000ms)
    const crossfadeTimer = setTimeout(() => {
      setInitialStage('crossfade');
    }, 1000);

    // 2. Crossfade completes smoothly, card is ready and interactive
    const readyTimer = setTimeout(() => {
      setInitialStage('ready');
    }, 1400);

    return () => {
      clearTimeout(crossfadeTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (exitStage !== 'idle' || initialStage !== 'ready') return;

    // Start soft, cinematic fade out of content
    setExitStage('fadingOut');

    // Smoothly dissolve in the "Loading Home..." loader with a natural 150ms overlap
    setTimeout(() => {
      setExitStage('loaderVisible');

      // Allow the home loader to complete its smooth snap cycle before navigating
      setTimeout(() => {
        setHasLoadedHomeOnce(true);
        router.push('/');
      }, 1300);
    }, 150);
  };

  const getContentClass = () => {
    if (exitStage === 'fadingOut' || exitStage === 'loaderVisible') {
      return css.contentFadingOut;
    }
    if (initialStage === 'ready' || initialStage === 'crossfade') {
      return css.contentVisible;
    }
    return css.contentHidden;
  };

  return (
    <div className={css.notFoundWrapper}>
      {/* Cinematic Projector Beam */}
      <div
        className={`${css.projectorBeam} ${
          exitStage !== 'idle' ? css.beamFadeOut : ''
        }`}
        aria-hidden="true"
      />

      {/* 404 Card Scene */}
      <div className={`${css.content} ${getContentClass()}`}>
        {/* Cinema Clapperboard Scene Badge */}
        <div className={css.clapperBadge}>
          <span className={css.clapperIcon} aria-hidden="true">🎬</span>
          <span className={css.clapperText}>SCENE: 404 &nbsp;|&nbsp; TAKE: NOT FOUND</span>
        </div>

        {/* Filmstrip with sprocket perforations & retro-styled 404 */}
        <div className={css.filmstripContainer}>
          <div className={css.filmPerforations} aria-hidden="true">
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
          </div>

          <h1 className={css.errorCode}>404</h1>

          <div className={css.filmPerforations} aria-hidden="true">
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
            <span className={css.sprocketHole} />
          </div>
        </div>

        <h2 className={css.errorMessage}>
          {t('notFound.message', 'Oops, this page was not found =(')}
        </h2>

        <p className={css.description}>
          {t(
            'notFound.description',
            'The movie/series or page you are looking for might have been moved or deleted.'
          )}
        </p>

        <button
          type="button"
          onClick={handleGoHome}
          className={css.homeBtn}
          disabled={exitStage !== 'idle' || initialStage !== 'ready'}
        >
          <span>{t('notFound.goHome', 'Go back to Home page')}</span>
        </button>
      </div>

      {/* 1. Initial 404 Loader Overlay (smooth crossfade dissolve) */}
      {initialStage !== 'ready' && (
        <div
          className={`${css.loaderOverlay} ${
            initialStage === 'crossfade' ? css.loaderOverlayExit : ''
          }`}
        >
          <ClapperboardLoader
            caption={t('common.loading', 'Loading...')}
            label="404"
          />
        </div>
      )}

      {/* 2. Exit "Loading Home..." Loader Overlay (soft emergent dissolve) */}
      {exitStage === 'loaderVisible' && (
        <div className={`${css.loaderOverlay} ${css.loaderOverlayEnter}`}>
          <ClapperboardLoader
            caption={t('home.loading', 'Loading home...')}
            label="HOME"
          />
        </div>
      )}
    </div>
  );
};

export default NotFound;
