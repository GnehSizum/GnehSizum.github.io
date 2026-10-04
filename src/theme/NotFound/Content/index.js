import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import CharacterBackground from '@site/src/components/CharacterBackground';

export default function NotFoundContent({className}) {
  const [greeting, setGreeting] = useState(false);
  const [awake, setAwake] = useState(false);
  const sleepTimeout = useRef(null);

  useEffect(() => () => clearTimeout(sleepTimeout.current), []);

  function wakeCat() {
    clearTimeout(sleepTimeout.current);
    setAwake(true);
    sleepTimeout.current = setTimeout(() => {
      setAwake(false);
      sleepTimeout.current = null;
    }, 3000);
  }

  return (
    <main className={clsx('container not-found', className)}>
      <CharacterBackground />
      <div className="not-found-scene">
        <div className="not-found-code">
          <span className="not-found-digit" aria-hidden="true">4</span>
          <span className="not-found-zero">
            <button
              className={clsx('not-found-cat', greeting && 'is-greeting', awake && 'is-awake')}
              type="button"
              aria-label={awake ? translate({id: 'notFound.catAwake', message: '小猫醒了，有点生气'}) : translate({id: 'notFound.cat', message: '叫醒睡觉的小猫'})}
              onPointerEnter={event => { if (event.pointerType !== 'touch') setGreeting(true); }}
              onPointerLeave={event => { if (event.pointerType !== 'touch') setGreeting(false); }}
              onFocus={() => setGreeting(true)}
              onBlur={() => setGreeting(false)}
              onClick={wakeCat}>
              <svg viewBox="0 0 36 28" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
                <g className="not-found-cat-legs">
                  {[6, 12, 22, 28].map(x => <rect key={x} x={x} y="17" width="3" height="9" />)}
                </g>
                <g className="not-found-cat-body">
                  <path d="M13 9h12v1h3v2h2v7H13Z" />
                  <path d="M27 15h6v4h-6Z" />
                  {[[30, 16], [31, 14], [32, 12], [32, 10], [31, 8], [30, 6], [30, 4]].map(([x, y], index) => (
                    <rect key={y} className="not-found-cat-tail" x={x} y={y} width="3" height="3" style={{'--tail-delay': `${index * 70}ms`}} />
                  ))}
                </g>
                <path className="not-found-cat-head" fillRule="evenodd" d={`M3 3h2v2h2v2h5V5h2V3h2v6h1v7h-2v2H4v-2H2V9h1Z ${awake ? 'M5 10h1v1h1v1h1v1H5Z M11 12h1v-1h1v-1h1v3h-3Z' : 'M5 11h3v1H5Z M11 11h3v1h-3Z'}`} />
              </svg>
            </button>
            <span className="not-found-digit" aria-hidden="true">0</span>
          </span>
          <span className="not-found-digit" aria-hidden="true">4</span>
        </div>
      </div>
      <div className="not-found-copy">
        <p className="not-found-eyebrow">404 / A LITTLE DETOUR</p>
        <h1>{translate({id: 'notFound.heading', message: '这一页，走丢了。'})}</h1>
        <p className="not-found-description">{translate({id: 'notFound.description', message: '可能是地址有误，也可能是页面搬了家。'})}<br />{translate({id: 'notFound.hint', message: '换条路，继续探索吧。'})}</p>
        <div className="not-found-actions">
          <Link className="button button--primary not-found-button" to="/">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" /></svg>
            {translate({id: 'notFound.home', message: '返回首页'})}
          </Link>
          <Link className="button button--secondary not-found-button" to="/blog/">
            {translate({id: 'notFound.blog', message: '浏览博客'})}
            <svg className="not-found-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
