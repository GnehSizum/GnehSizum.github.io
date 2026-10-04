import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import OriginalColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import IconLanguage from '@theme/Icon/Language';

export default function NavbarColorModeToggle({className, ...props}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const {createUrl} = useAlternatePageUtils();
  const {search, hash} = useLocation();
  const locale = currentLocale === 'en' ? 'zh-Hans' : 'en';
  const label = locale === 'en' ? 'Switch to English' : '切换到中文';

  return (
    <div className={clsx('navbar-preferences', className)}>
      <Link className="navbar-language" to={`pathname://${createUrl({locale, fullyQualified: false})}${search}${hash}`} autoAddBaseUrl={false} target="_self" hrefLang={locale === 'en' ? 'en' : 'zh-CN'} aria-label={label} title={label}>
        <IconLanguage width="18" height="18" aria-hidden="true" />
        <span lang={locale === 'en' ? 'en' : 'zh-CN'}>{locale === 'en' ? 'EN' : '中'}</span>
      </Link>
      <OriginalColorModeToggle {...props} />
    </div>
  );
}
