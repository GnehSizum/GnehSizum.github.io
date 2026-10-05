import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';

export default function NotesOverview() {
  return (
    <div className="notes-overview">
      <header className="notes-overview-header">
        <div>
          <p className="notes-eyebrow">THE NOTEBOOK</p>
          <h1>{translate({id: 'notes.title', message: '笔记'})}</h1>
        </div>
        <svg className="notes-orbit" width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <circle cx="70" cy="70" r="46" opacity=".2" />
          <ellipse cx="70" cy="70" rx="59" ry="24" transform="rotate(-35 70 70)" opacity=".5" />
          <ellipse cx="70" cy="70" rx="24" ry="59" transform="rotate(-35 70 70)" opacity=".3" />
          <path d="M70 105V33m0 37 38 23m-38-23L32 88" opacity=".6" />
          <circle cx="70" cy="70" r="4" fill="currentColor" stroke="none" />
          <circle className="notes-orbit-dot" cx="108" cy="39" r="4" fill="currentColor" stroke="none" />
        </svg>
      </header>
      <section aria-labelledby="notes-slam-title">
        <div className="notes-topic-heading">
          <div><p className="notes-eyebrow">ROBOTICS / SLAM</p><h2 id="notes-slam-title">{translate({id: 'notes.slamTitle', message: '视觉 SLAM 十四讲'})}</h2></div>
          <span className="notes-topic-count">{translate({id: 'notes.chapterCount', message: '2 篇笔记'})}</span>
        </div>
        <p className="notes-topic-description">{translate({id: 'notes.slamDescription', message: '《视觉 SLAM 十四讲》的章节笔记。'})}</p>
        <div className="notes-chapters">
          <Link className="notes-chapter" to="/note/vslam14/vslam_03/">
            <span className="notes-chapter-number" aria-hidden="true">03</span>
            <div className="notes-chapter-copy"><h3>{translate({id: 'notes.chapter3', message: '三维空间刚体运动'})}</h3><p>{translate({id: 'notes.chapter3Description', message: '旋转矩阵、四元数与坐标变换。'})}</p><span className="notes-chapter-topics">ROTATION · QUATERNION · TRANSFORM</span></div>
            <svg className="notes-chapter-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
          <Link className="notes-chapter" to="/note/vslam14/vslam_04/">
            <span className="notes-chapter-number" aria-hidden="true">04</span>
            <div className="notes-chapter-copy"><h3>{translate({id: 'notes.chapter4', message: '李群与李代数'})}</h3><p>{translate({id: 'notes.chapter4Description', message: '李群、李代数及其联系。'})}</p><span className="notes-chapter-topics">LIE GROUP · LIE ALGEBRA</span></div>
            <svg className="notes-chapter-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
