import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useVisibleBlogSidebarItems, BlogSidebarItemList} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';

function ArticleList({items}) {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName="blog-directory-list clean-list"
      liClassName="blog-directory-item"
      linkClassName="blog-directory-link"
      linkActiveClassName="blog-directory-link--active"
    />
  );
}

export default function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <aside className="col col--3 blog-directory-column">
      <nav className="blog-directory thin-scrollbar" aria-label={translate({id: 'theme.blog.sidebar.navAriaLabel', message: 'Blog recent posts navigation'})}>
        <div className="blog-directory-header">
          <div><p className="blog-directory-eyebrow">JOURNAL</p><h2>{sidebar.title}</h2></div>
        </div>
        <BlogSidebarContent items={items} ListComponent={ArticleList} yearGroupHeadingClassName="blog-directory-year" />
      </nav>
    </aside>
  );
}
