import React from 'react';

export default function PixelCat({awake, angry = false, classPrefix}) {
  const eyes = awake
    ? angry ? 'M5 10h1v1h1v1h1v1H5Z M11 12h1v-1h1v-1h1v3h-3Z' : 'M5 10h3v3H5Z M11 10h3v3h-3Z'
    : 'M5 11h3v1H5Z M11 11h3v1h-3Z';

  return (
    <svg viewBox="0 0 36 28" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <g className={`${classPrefix}-legs`}>
        {[6, 12, 22, 28].map((x, index) => <rect key={x} className={`${classPrefix}-leg`} x={x} y="17" width="3" height="9" style={{'--leg-delay': `${index % 2 * -0.4}s`}} />)}
      </g>
      <g className={`${classPrefix}-body`}>
        <path d="M13 9h12v1h3v2h2v7H13Z" />
        <path d="M27 15h6v4h-6Z" />
        {[[30, 16], [31, 14], [32, 12], [32, 10], [31, 8], [30, 6], [30, 4]].map(([x, y], index) => (
          <rect key={y} className={`${classPrefix}-tail`} x={x} y={y} width="3" height="3" style={{'--tail-delay': `${index * 70}ms`}} />
        ))}
      </g>
      <path className={`${classPrefix}-head`} fillRule="evenodd" d={`M3 3h2v2h2v2h5V5h2V3h2v6h1v7h-2v2H4v-2H2V9h1Z ${eyes}`} />
    </svg>
  );
}
