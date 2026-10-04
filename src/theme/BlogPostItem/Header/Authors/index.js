import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import OriginalAuthors from '@theme-original/BlogPostItem/Header/Authors';

export default function BlogPostItemHeaderAuthors(props) {
  const {isBlogPostPage} = useBlogPost();
  return isBlogPostPage ? <OriginalAuthors {...props} /> : null;
}
