import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import PixelCat from './PixelCat';

export default function FooterCat() {
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(-1);
  const track = useRef(null);
  const movement = useRef({position: 0, direction: -1});

  useEffect(() => {
    if (!running) return undefined;
    let frame;
    let previous;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = setTimeout(() => setRunning(false), 5000);

    function step(now) {
      const elapsed = previous === undefined ? 0 : Math.min(now - previous, 50);
      previous = now;
      const limit = Math.min(140, Math.max(0, (track.current.clientWidth - 72) / 2));
      const next = movement.current;
      next.position = Math.max(-limit, Math.min(limit, next.position + next.direction * elapsed * 0.048));
      if (next.position <= -limit) next.direction = 1;
      else if (next.position >= limit) next.direction = -1;
      setPosition(next.position);
      setDirection(next.direction);
      frame = requestAnimationFrame(step);
    }

    if (!reducedMotion) frame = requestAnimationFrame(step);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [running]);

  return (
    <div className="footer-cat-track" ref={track}>
      <button
        type="button"
        className={clsx('footer-cat', running && 'is-running', direction === 1 && 'faces-right')}
        style={{'--cat-x': `${position}px`}}
        aria-label={running ? translate({id: 'footer.catRunning', message: '小猫正在散步，5 秒后继续睡觉'}) : translate({id: 'footer.catSleep', message: '点击，让睡觉的小猫散步一会儿'})}
        onClick={() => setRunning(true)}>
        <span className="footer-cat-snooze" aria-hidden="true"><span>z</span><span>z</span><span>Z</span></span>
        <span className="footer-cat-sprite"><PixelCat awake={running} classPrefix="footer-cat" /></span>
      </button>
    </div>
  );
}
