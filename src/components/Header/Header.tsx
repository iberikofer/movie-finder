'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSavedMovies } from '../../hooks/useSavedMovies';
import { hasSavedPageScroll, clearPageSession } from '../../utils/sessionStorage';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import PWAInstallPrompt from '../PWA/PWAInstallPrompt';
import { useLanguage } from '../../context/LanguageContext';
import css from './Header.module.css';

interface AnimState {
  key: number;
  type: 'increase' | 'decrease' | null;
}

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { savedCount } = useSavedMovies();
  const { t, language } = useLanguage();
  const [animState, setAnimState] = useState<AnimState>({ key: 0, type: null });
  const prevSavedCountRef = useRef<number>(savedCount);

  useEffect(() => {
    if (prevSavedCountRef.current < savedCount) {
      setAnimState(prev => ({ key: prev.key + 1, type: 'increase' }));
    } else if (prevSavedCountRef.current > savedCount) {
      setAnimState(prev => ({ key: prev.key + 1, type: 'decrease' }));
    }
    prevSavedCountRef.current = savedCount;
  }, [savedCount]);

  const [status, setStatus] = useState<'idle' | 'confirming' | 'deleted'>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname() || '/';

  const navRef = useRef<HTMLElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hasTransition, setHasTransition] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTransition(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const isMovieDetails = /(?:^|\/(?:movie-finder|react-movie-finder))\/movies\/[^/]+/.test(pathname);
  const movieOrigin = isMovieDetails
    ? (typeof window !== 'undefined' ? sessionStorage.getItem('movie_origin_tab') : 'movies')
    : null;

  const isHomeActive = !isMovieDetails && pathname === '/';
  const isSearchActive = isMovieDetails
    ? movieOrigin === 'movies'
    : (pathname.startsWith('/movies') && !isMovieDetails);
  const isTrendingActive = isMovieDetails
    ? movieOrigin === 'trending'
    : pathname.startsWith('/trending');
  const isSavedActive = isMovieDetails
    ? movieOrigin === 'saved'
    : pathname.startsWith('/saved');

  const prevLangRef = useRef<string>(language);
  const [isLangSwitching, setIsLangSwitching] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      setIsLangSwitching(true);
      const raf = requestAnimationFrame(() => {
        setIsLangSwitching(false);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [language]);

  // Dynamic Document Title based on active route and language
  useEffect(() => {
    const p = pathname;
    if (p === '/') {
      document.title = `Movie Finder | ${t('nav.home', 'Home')}`;
    } else if (p.startsWith('/movies') && !isMovieDetails) {
      document.title = `Movie Finder | ${t('nav.search', 'Search')}`;
    } else if (p.startsWith('/trending')) {
      document.title = `Movie Finder | ${t('nav.trending', 'Trending')}`;
    } else if (p.startsWith('/saved')) {
      document.title = `Movie Finder | ${t('nav.saved', 'Saved')}`;
    }
  }, [pathname, language, isMovieDetails, t]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector<HTMLElement>(`.${css.activeLink}`);
      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
          opacity: 1,
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [pathname, savedCount, isMovieDetails, movieOrigin, language]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      const prevPath = prevPathnameRef.current;
      const nextPath = pathname;
      prevPathnameRef.current = pathname;
      setIsMenuOpen(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      setStatus('idle');

      const movieRegex = /(?:^|\/(?:movie-finder|react-movie-finder))\/movies\/([^/]+)/;
      const prevMovieMatch = prevPath.match(movieRegex);
      const nextMovieMatch = nextPath.match(movieRegex);
      const isSameMovieSubtab =
        prevMovieMatch &&
        nextMovieMatch &&
        prevMovieMatch[1] === nextMovieMatch[1];

      const isTrending = /(?:^|\/(?:movie-finder|react-movie-finder))\/trending\/?$/.test(nextPath);
      const isMovies = /(?:^|\/(?:movie-finder|react-movie-finder))\/movies\/?$/.test(nextPath);
      const hasSavedTrendingScroll = isTrending && hasSavedPageScroll('trending_session');
      const hasSavedMoviesScroll = isMovies && hasSavedPageScroll('movies_session');

      if (!isSameMovieSubtab && !hasSavedTrendingScroll && !hasSavedMoviesScroll) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (status !== 'confirming') return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setStatus('idle');
      }
    };

    const delayTimer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(delayTimer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [status]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (status === 'deleted') return;

    if (status === 'idle') {
      setStatus('confirming');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setStatus('idle');
      }, 4000);
      return;
    }

    if (status === 'confirming') {
      if (timerRef.current) clearTimeout(timerRef.current);

      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('critics_score_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));

      window.dispatchEvent(
        new CustomEvent('critics_score_updated', {
          detail: { all: true },
        })
      );

      setStatus('deleted');
      timerRef.current = setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }
  };

  return (
    <>
      <header className={`${css.header} ${isScrolled || isMenuOpen ? css.headerScrolled : ''}`}>
        <div className={css.headerInner}>
          <div className={css.logoWrapper}>
            <Link
              href="/"
              className={css.logoLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={css.logoIcon}>🎬</span>
              <span className={css.logoText}>MovieFinder</span>
            </Link>
          </div>

          <nav
            className={css.navigation}
            ref={navRef}
            aria-label={t('header.navAria', 'Main navigation')}
          >
            <Link
              href="/"
              className={`${css.navLink} ${isHomeActive ? css.activeLink : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/movies"
              className={`${css.navLink} ${isSearchActive ? css.activeLink : ''}`}
            >
              {t('nav.search')}
            </Link>
            <Link
              href="/trending"
              className={`${css.navLink} ${isTrendingActive ? css.activeLink : ''}`}
              onClick={() => {
                clearPageSession('trending_session');
                window.dispatchEvent(new CustomEvent('trending_nav_click'));
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
            >
              {t('nav.trending')}
            </Link>
            <Link
              href="/saved"
              className={`${css.navLink} ${isSavedActive ? css.activeLink : ''}`}
            >
              <span>{t('nav.saved')}</span>
              {savedCount > 0 && (
                <span
                  key={animState.key}
                  className={`${css.savedBadge} ${
                    animState.type === 'increase'
                      ? css.savedBadgeBump
                      : animState.type === 'decrease'
                      ? css.savedBadgeShrink
                      : ''
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </Link>
            <span
              className={`${css.navIndicator} ${
                hasTransition && !isLangSwitching ? css.navIndicatorTransition : ''
              }`}
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition: hasTransition && !isLangSwitching ? undefined : 'left 0s, width 0s',
              }}
              aria-hidden="true"
            />
          </nav>

          <div className={css.headerDesktopActions}>
            <PWAInstallPrompt />
            <LanguageToggle />
            <button
              ref={buttonRef}
              type="button"
              disabled={status === 'deleted'}
              className={`${css.clearAllBtn} ${
                status === 'confirming' ? css.clearAllBtnConfirm : ''
              } ${status === 'deleted' ? css.clearAllBtnDeleted : ''}`}
              onClick={handleClearAll}
              aria-label={
                status === 'confirming'
                  ? t('header.confirmClearAll')
                  : status === 'deleted'
                  ? t('header.ratingsDeleted')
                  : t('header.clearAllRatings')
              }
            >
              <span className={css.trashIcon} aria-hidden="true">
                {status === 'confirming'
                  ? '⚠️'
                  : status === 'deleted'
                  ? '✅'
                  : '🗑️'}
              </span>
              <span className={css.clearAllBtnText}>
                {status === 'confirming'
                  ? t('header.confirmClearAll')
                  : status === 'deleted'
                  ? t('header.ratingsDeleted')
                  : t('header.clearAllRatings')}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`${css.burgerBtn} ${isMenuOpen ? css.burgerBtnOpen : ''}`}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={t('header.toggleMenu', 'Toggle navigation menu')}
            aria-expanded={isMenuOpen}
          >
            <span className={css.burgerLine} />
            <span className={css.burgerLine} />
            <span className={css.burgerLine} />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`${css.mobileDrawer} ${isMenuOpen ? css.mobileDrawerOpen : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <div className={css.mobileDrawerTop}>
            <div className={css.mobileActionsGroup}>
              <PWAInstallPrompt />
              <LanguageToggle />
              <button
                type="button"
                disabled={status === 'deleted'}
                className={`${css.mobileClearAllBtn} ${
                  status === 'confirming' ? css.mobileClearAllBtnConfirm : ''
                } ${status === 'deleted' ? css.mobileClearAllBtnDeleted : ''}`}
                onClick={handleClearAll}
                aria-label={
                  status === 'confirming'
                    ? t('header.confirmClearAll')
                    : status === 'deleted'
                    ? t('header.ratingsDeleted')
                    : t('header.clearAllRatings')}
              >
                <span className={css.trashIcon} aria-hidden="true">
                  {status === 'confirming'
                    ? '⚠️'
                    : status === 'deleted'
                    ? '✅'
                    : '🗑️'}
                </span>
                <span className={css.mobileClearAllText}>
                  {status === 'confirming'
                    ? t('header.confirmClearAll')
                    : status === 'deleted'
                    ? t('header.ratingsDeleted')
                    : t('header.clearAllRatings')}
                </span>
              </button>
            </div>
          </div>

          <div className={css.mobileDrawerDivider} />

          <div className={css.mobileNavLinks}>
            <Link
              href="/"
              className={`${css.mobileNavLink} ${isHomeActive ? css.mobileActiveLink : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={css.mobileNavIcon}>🎬</span>
              <span className={css.mobileNavText}>{t('nav.home')}</span>
              {isHomeActive && <span className={css.mobileActiveBadge} />}
            </Link>
            <Link
              href="/movies"
              className={`${css.mobileNavLink} ${isSearchActive ? css.mobileActiveLink : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={css.mobileNavIcon}>🔍</span>
              <span className={css.mobileNavText}>{t('nav.search')}</span>
              {isSearchActive && <span className={css.mobileActiveBadge} />}
            </Link>
            <Link
              href="/trending"
              className={`${css.mobileNavLink} ${isTrendingActive ? css.mobileActiveLink : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                clearPageSession('trending_session');
                window.dispatchEvent(new CustomEvent('trending_nav_click'));
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
            >
              <span className={css.mobileNavIcon}>🔥</span>
              <span className={css.mobileNavText}>{t('nav.trending')}</span>
              {isTrendingActive && <span className={css.mobileActiveBadge} />}
            </Link>
            <Link
              href="/saved"
              className={`${css.mobileNavLink} ${isSavedActive ? css.mobileActiveLink : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={css.mobileNavIcon}>🔖</span>
              <span className={css.mobileNavText}>{t('nav.saved')}</span>
              {savedCount > 0 && (
                <span className={css.mobileSavedBadge}>
                  {savedCount}
                </span>
              )}
              {isSavedActive && <span className={css.mobileActiveBadge} />}
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <div
        className={`${css.mobileBackdrop} ${isMenuOpen ? css.mobileBackdropOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <main className={css.mainContent}>
        <div className={css.contentFadeIn}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Header;
