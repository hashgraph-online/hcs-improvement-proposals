import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link, { type Props as LinkProps } from '@docusaurus/Link';
import AuthorSocials from '@theme/Blog/Components/Author/Socials';
import type { Props } from '@theme/Blog/Components/Author';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function MaybeLink(props: LinkProps): ReactNode {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}

function AuthorTitle({ title }: { title: string }) {
  return (
    <small className={styles.authorTitle} title={title}>
      {title}
    </small>
  );
}

function AuthorName({ name, as }: { name: string; as: Props['as'] }) {
  if (!as) {
    return (
      <span className={styles.authorName} translate="no">
        {name}
      </span>
    );
  }

  return (
    <Heading as={as} className={styles.authorName} translate="no">
      {name}
    </Heading>
  );
}

function AuthorBlogPostCount({ count }: { count: number }) {
  return <span className={clsx(styles.authorBlogPostCount)}>{count}</span>;
}

export default function BlogAuthor({
  as,
  author,
  className,
  count,
}: Props): ReactNode {
  const { name, title, url, imageURL, email, page } = author;
  const link =
    page?.permalink || url || (email && `mailto:${email}`) || undefined;

  return (
    <div
      className={clsx(
        'avatar margin-bottom--sm',
        className,
        styles[`author-as-${as}`],
      )}
    >
      {imageURL && (
        <MaybeLink
          href={link}
          className="avatar__photo-link"
          aria-label={name ? `Author: ${name}` : 'Author profile'}
        >
          <span className="sr-only">{name ? `Author: ${name}` : 'Author'}</span>
          <img
            className={clsx('avatar__photo', styles.authorImage)}
            src={imageURL}
            alt={name}
          />
        </MaybeLink>
      )}

      {(name || title) && (
        <div className={clsx('avatar__intro', styles.authorDetails)}>
          <div className="avatar__name">
            {name && (
              <MaybeLink href={link} aria-label={`Author: ${name}`}>
                <AuthorName name={name} as={as} />
              </MaybeLink>
            )}
            {count !== undefined && <AuthorBlogPostCount count={count} />}
          </div>
          {!!title && <AuthorTitle title={title} />}

          <AuthorSocials author={author} />
        </div>
      )}
    </div>
  );
}

