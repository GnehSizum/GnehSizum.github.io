import {translate} from '@docusaurus/Translate';
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CharacterBackground from '../components/CharacterBackground';

export default function Home() {
  return (
    <Layout title={translate({id: "home.title", message: "首页"})} description={translate({id: "home.description", message: "GnehSizum 的个人博客，包含技术文章、学习笔记和日常记录。"})}>
      <main className="container home-main">
        <header className="home-hero">
          <CharacterBackground />
          <img className="profile-avatar home-avatar" src="/images/head.jpg" alt="GnehSizum" />
          <h1><span>Mu Blog</span></h1>
          <p className="home-tagline">One today is worth two tomorrows.</p>
          <div className="home-actions">
            <Link className="button button--primary button--lg home-action" to="/blog/">
              {translate({id: "home.blogButton", message: "浏览博客"})}<svg className="home-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </Link>
            <Link className="button button--secondary button--lg home-action" to="/about/">
              {translate({id: "home.aboutButton", message: "看看他是谁"})}<svg className="home-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </Link>
          </div>
        </header>
        <section aria-label={translate({id: 'home.navigation', message: '网站内容'})}>
          <div className="home-portals">
            <Link className="home-portal home-portal--blog" to="/blog/">
              <div className="home-portal-top">
                <span className="home-portal-label">BLOG</span>
                <svg className="home-portal-art" width="80" height="72" viewBox="0 0 80 72" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect className="home-portal-art-back" x="20" y="14" width="37" height="47" rx="5" transform="rotate(-12 38 37)" />
                  <g className="home-portal-art-front"><rect x="28" y="9" width="37" height="47" rx="5" /><path d="M36 21h14m-14 8h21m-21 8h21m-21 8h12" /><path className="home-portal-art-accent" d="m54 48 15-15 4 4-15 15-6 2Z" /></g>
                </svg>
              </div>
              <h3>{translate({id: 'home.blogTitle', message: '博客'})}</h3>
              <p>{translate({id: 'home.blogDescription', message: '一些技术实践'})}</p>
              <span className="home-portal-cta">{translate({id: 'home.blogCta', message: '浏览一篇博客'})}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
            </Link>
            <Link className="home-portal home-portal--notes" to="/note/">
              <div className="home-portal-top">
                <span className="home-portal-label">NOTES</span>
                <svg className="home-portal-art" width="80" height="72" viewBox="0 0 80 72" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="home-portal-art-back" d="M15 22h24v39H15zM41 22h24v39H41z" />
                  <g className="home-portal-art-front"><path d="M40 58c-7-5-16-6-25-3V17c9-3 18-2 25 3 7-5 16-6 25-3v38c-9-3-18-2-25 3Z" /><path d="M40 20v38m-18-31 10 2m-10 6 10 2m-10 6 7 1m19-15 10-2m-10 10 10-2" /><path className="home-portal-art-accent" d="M52 13v14l5-3 5 3V13Z" /></g>
                </svg>
              </div>
              <h3>{translate({id: 'home.notesTitle', message: '笔记'})}</h3>
              <p>{translate({id: 'home.notesDescription', message: '一些学习笔记'})}</p>
              <span className="home-portal-cta">{translate({id: 'home.notesCta', message: '一起学点什么'})}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
            </Link>
            <Link className="home-portal home-portal--about" to="/about/">
              <div className="home-portal-top">
                <span className="home-portal-label">ABOUT</span>
                <svg className="home-portal-art" width="80" height="72" viewBox="0 0 80 72" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <ellipse className="home-portal-art-back" cx="40" cy="36" rx="34" ry="18" transform="rotate(-30 40 36)" />
                  <g className="home-portal-art-front"><circle cx="40" cy="36" r="22" /><path d="M33 31v3m14-3v3m-14 7c4 5 10 5 14 0" /></g>
                  <circle className="home-portal-art-accent" cx="66" cy="17" r="4" /><path d="M15 17v6m-3-3h6" />
                </svg>
              </div>
              <h3>{translate({id: 'home.aboutTitle', message: '关于'})}</h3>
              <p>{translate({id: 'home.aboutDescription', message: '我、朋友们和一些生活片段'})}</p>
              <span className="home-portal-cta">{translate({id: 'home.aboutCta', message: '很高兴认识你'})}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
