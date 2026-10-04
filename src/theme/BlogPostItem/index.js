import {translate} from '@docusaurus/Translate';
import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';

export default function BlogPostItem(props) {
  const {metadata, isBlogPostPage} = useBlogPost();
  if (isBlogPostPage) return <OriginalBlogPostItem {...props} />;

  return (
    <article className={`compact-post ${props.className || ''}`}>
      <header>
        <BlogPostItemHeaderInfo className="compact-post-meta" />
        <h2 className="compact-post-title"><Link to={metadata.permalink}>{metadata.title}</Link></h2>
      </header>
      <p className="compact-post-summary">{metadata.description}</p>
      <footer className="compact-post-footer">
        <ul className="compact-post-tags" aria-label={translate({id: "blog.tags", message: "文章标签"})}>
          {metadata.tags.map(tag => <li key={tag.permalink}><Link to={tag.permalink}>{tag.label}</Link></li>)}
        </ul>
        <Link className="compact-post-read" to={metadata.permalink} aria-label={translate({id: "blog.readPost", message: "阅读全文：{title}"}, {title: metadata.title})}>{translate({id: "blog.readMore", message: "阅读全文"})} <span aria-hidden="true">↗</span></Link>
      </footer>
    </article>
  );
}
