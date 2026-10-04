import {translate} from '@docusaurus/Translate';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import about from '../data/about.json';

export default function About() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photoDialog = useRef(null);

  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const dialog = photoDialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <Layout title={translate({id: "about.title", message: "关于我"})} description="GnehSizum · Robotics Engineer · Shenzhen, China">
      <main className="container about-main">
        <header className="about-header">
          <div className="about-header-copy">
            <p className="about-eyebrow">ABOUT ME</p>
            <h1>GnehSizum<span>.</span></h1>
            <p className="about-motto">One today is worth two tomorrows.</p>
            <div className="about-identity"><span>{about.profession}</span><span>{about.location}</span></div>
          </div>
          <div className="about-portrait">
            <span className="about-portrait-orbit" aria-hidden="true" />
            <img className="profile-avatar" src="/images/head.jpg" alt="GnehSizum" />
            <svg className="about-portrait-spark" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z" /></svg>
            <span className="about-code-mark" aria-hidden="true">&lt;/&gt;</span>
          </div>
        </header>
        <Tabs>
          <TabItem value="about" label={translate({id: "about.title", message: "关于我"})}>
            <div className="about-grid">
              <section className="about-panel about-panel--intro">
                <p className="about-eyebrow">A LITTLE ABOUT ME</p>
                <h2>Hello<span>.</span><svg className="about-hello-spark" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M14 3v22M3 14h22M6 6l16 16M6 22 22 6" /></svg></h2>
                <p>{translate({id: "about.intro", message: "这个人太懒了，没有留下介绍。"})}</p>
                <figure className="about-quote">
                  <span className="about-quote-mark" aria-hidden="true">“</span>
                  <blockquote>{translate({id: "about.quote.1", message: "一人说，将来胜过现在。"})}<br />{translate({id: "about.quote.2", message: "一人说，现在远不及从前。"})}<br />{translate({id: "about.quote.3", message: "一人说，什么?"})}<br />{translate({id: "about.quote.4", message: "时道，你们都侮辱我的现在。"})}<br />{translate({id: "about.quote.5", message: "从前好的，自己回去。"})}<br />{translate({id: "about.quote.6", message: "将来好的，跟我前去。"})}<br />{translate({id: "about.quote.7", message: "这说什么的，"})}<br />{translate({id: "about.quote.8", message: "我不和你说什么。"})}</blockquote>
                  <figcaption>{translate({id: "about.quoteAuthor", message: "—— 鲁迅"})}</figcaption>
                </figure>
              </section>
              <section className="about-panel about-panel--skills">
                <div className="about-panel-heading"><div><p className="about-eyebrow">TOOLBOX</p><h2>{translate({id: "about.skills", message: "技能"})}</h2></div></div>
                <div className="skill-tags">{about.skills.map(skill => <span className="badge badge--secondary" key={skill}>{skill}</span>)}</div>
              </section>
              <section className="about-panel about-panel--contact">
                <div className="about-panel-heading"><div><p className="about-eyebrow">GET IN TOUCH</p><h2>{translate({id: "about.contact", message: "联系"})}</h2></div></div>
                <dl className="about-contact">
                  <div><dt>Email</dt><dd><a href="mailto:muzs@foxmail.com">muzs@foxmail.com <span aria-hidden="true">↗</span></a></dd></div>
                  <div><dt>GitHub</dt><dd><a href="https://github.com/GnehSizum">GnehSizum <span aria-hidden="true">↗</span></a></dd></div>
                  <div><dt>QQ</dt><dd>284782399</dd></div>
                </dl>
              </section>
            </div>
          </TabItem>
          <TabItem value="friends" label={translate({id: "about.friends", message: "朋友们"})}>
            <div className="about-section-heading friends-heading">
              <div><p className="about-eyebrow">GOOD COMPANY</p><h2>{translate({id: "about.friends", message: "朋友们"})}</h2></div>
            </div>
            {[{title: translate({id: "about.places", message: "一些值得逛逛的地方"}), links: about.websites}, {title: translate({id: "about.people", message: "一些有趣的人"}), links: about.friends}].map(group => (
              <section className="friends-group" key={group.title}>
                <h3 className="friends-group-title">{group.title}</h3>
                <div className="friends-grid">{group.links.map((friend, index) => (
                  <a className="friend-card" href={friend.url} key={friend.name} target="_blank" rel="noopener noreferrer" style={{'--friend-index': index}} aria-label={translate({id: "about.visitFriend", message: "访问 {name} 的网站（在新标签页打开）"}, {name: friend.name})}>
                    <div className="friend-card-top">
                      <img src={friend.avatar} alt="" loading="lazy" />
                      <div className="friend-info"><h4>{friend.name}</h4><span>{new URL(friend.url).hostname}</span></div>
                      <span className="friend-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
                    </div>
                    <div className="friend-card-bottom"><p>{translate({id: `about.friend.${friend.name}`, message: friend.desc})}</p></div>
                  </a>
                ))}</div>
              </section>
            ))}
          </TabItem>
          <TabItem value="moments" label={translate({id: "about.moments", message: "生活片段"})}>
            <div className="about-section-heading"><div><p className="about-eyebrow">LIFE, IN FRAMES</p><h2>{translate({id: "about.moments", message: "生活片段"})}</h2></div><span>{translate({id: "about.photoCount", message: "{count} 张相片"}, {count: String(about.gallery.length).padStart(2, '0')})}</span></div>
            <div className="gallery-grid">{about.gallery.map((photo, index) => (
              <figure key={photo.src}>
                <button className="photo-open" type="button" aria-label={translate({id: "about.enlargePhoto", message: "放大照片：{caption}"}, {caption: photo.caption})} aria-haspopup="dialog" onClick={() => setSelectedPhoto({...photo, index})} />
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <figcaption><span className="photo-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{photo.caption}</figcaption>
              </figure>
            ))}</div>
          </TabItem>
        </Tabs>
      </main>
      <dialog className="photo-dialog" ref={photoDialog} aria-label={translate({id: "about.photoPreview", message: "照片预览"})} aria-describedby="photo-dialog-caption" onClose={() => setSelectedPhoto(null)} onClick={event => {
        if (event.target === event.currentTarget) photoDialog.current.close();
      }}>
        {selectedPhoto && <div className="photo-dialog-content">
          <figure className="photo-dialog-paper">
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            <figcaption id="photo-dialog-caption"><span className="photo-number" aria-hidden="true">{String(selectedPhoto.index + 1).padStart(2, '0')}</span>{selectedPhoto.caption}</figcaption>
          </figure>
          <button className="photo-close" type="button" aria-label={translate({id: "about.closePhoto", message: "关闭照片"})} autoFocus onClick={() => photoDialog.current.close()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>}
      </dialog>
    </Layout>
  );
}
