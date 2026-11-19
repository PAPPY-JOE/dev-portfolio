import { useEffect, useRef } from 'react';
import type { SiteContent } from '../types';

const revealTargets = '.section-heading, .project-card, .earlier-work, .about-intro, .experience-heading, .experience-item, .skill-group, .contact-copy, .contact-panel';

export function usePortfolioMotion(content: SiteContent) {
  const root = useRef<HTMLDivElement>(null);
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window) || !element.animate) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const active = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;

    const stop = () => {
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
    };

    const configure = () => {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
          observer?.unobserve(entry.target);
          if (revealed.current.has(entry.target)) return;
          revealed.current.add(entry.target);

          // Content above the viewport or already being used stays still.
          if (entry.boundingClientRect.top < 0 || entry.target.contains(document.activeElement)) return;
          const animation = entry.target.animate([
            { opacity: 0.25, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: 520,
            delay: Math.min(index, 2) * 65,
            easing: 'cubic-bezier(.2,.7,.2,1)',
            fill: 'backwards',
          });
          active.set(entry.target, animation);
          animation.onfinish = animation.oncancel = () => active.delete(entry.target);
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

      element.querySelectorAll(revealTargets).forEach(target => {
        if (!revealed.current.has(target)) observer?.observe(target);
      });
    };

    const keepFocusedContentVisible = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest(revealTargets) : null;
      if (!target || !element.contains(target)) return;
      revealed.current.add(target);
      observer?.unobserve(target);
      active.get(target)?.cancel();
    };

    configure();
    preference.addEventListener('change', configure);
    element.addEventListener('focusin', keepFocusedContentVisible);
    return () => {
      stop();
      preference.removeEventListener('change', configure);
      element.removeEventListener('focusin', keepFocusedContentVisible);
    };
  }, [content]);

  return root;
}
