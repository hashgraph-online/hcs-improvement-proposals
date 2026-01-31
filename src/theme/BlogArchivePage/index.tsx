import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import Layout from '@theme/Layout';
import type {ArchiveBlogPost, Props} from '@theme/BlogArchivePage';
import Heading from '@theme/Heading';
import CanonicalUrl from '@site/src/components/CanonicalUrl';

type MonthProp = {
  month: string;
  monthName: string;
  posts: ArchiveBlogPost[];
};

type YearProp = {
  year: string;
  months: MonthProp[];
};

function Year({year, months}: YearProp) {
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });

  const formatDate = (lastUpdated: string) => {
    const date = new Date(lastUpdated);
    return date.getUTCDate();
  };

  return (
    <>
      <Heading as="h3" id={year}>
        {year}
      </Heading>
      {months.map((monthData) => (
        <div key={`${year}-${monthData.month}`} className="margin-bottom--md">
          <h4 style={{ 
            fontSize: '0.9em', 
            color: 'var(--ifm-color-emphasis-600)',
            marginBottom: '0.5rem',
            marginTop: '1rem'
          }}>
            {monthData.monthName}
          </h4>
          <ul style={{ marginLeft: '1rem' }}>
            {monthData.posts.map((post) => (
              <li key={post.metadata.date}>
                <Link to={post.metadata.permalink}>
                  {formatDate(post.metadata.date)} - {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function YearsSection({years}: {years: YearProp[]}) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <div className="row">
          {years.map((_props, idx) => (
            <div key={idx} className="col col--4 margin-vert--lg">
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function listPostsByYears(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const postsByYearMonth = blogPosts.reduce((acc, post) => {
    const date = new Date(post.metadata.date);
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const monthName = monthNames[date.getUTCMonth()];
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = {
        month,
        monthName,
        posts: []
      };
    }
    
    acc[year][month].posts.push(post);
    return acc;
  }, {} as Record<string, Record<string, MonthProp>>);

  // Convert to array and sort
  const years = Object.entries(postsByYearMonth).map(([year, monthsObj]) => {
    const months = Object.values(monthsObj)
      .sort((a, b) => b.month.localeCompare(a.month)); // Sort months in descending order
    
    return {
      year,
      months
    };
  }).sort((a, b) => b.year.localeCompare(a.year)); // Sort years in descending order

  return years;
}

export default function BlogArchive({archive}: Props): ReactNode {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  });
  const years = listPostsByYears(archive.blogPosts);
  return (
    <>
      <PageMetadata title={title} description={description} />
      <CanonicalUrl path="/blog/archive/" />
      <Layout>
        <header className="hero hero--primary">
          <div className="container">
            <Heading as="h1" className="hero__title">
              {title}
            </Heading>
            <p className="hero__subtitle">{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  );
}
