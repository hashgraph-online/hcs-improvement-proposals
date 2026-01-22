import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';

type TrackFn = (name: string, data?: Record<string, unknown>) => void;
type TrackViewFn = (url: string, referrer?: string) => void;
type UmamiObject = { track?: TrackFn; trackView?: TrackViewFn };
type UmamiLike = UmamiObject | TrackFn | undefined;

const target = 'https://click.hol.org/hederahacks';

function getUmami(): UmamiLike {
  const w = window as unknown as { umami?: unknown };
  if (typeof w.umami === 'function') return w.umami as TrackFn;
  if (typeof w.umami === 'object' && w.umami !== null) return w.umami as UmamiObject;
  return undefined;
}

export default function HackathonRedirect(): JSX.Element {
  useEffect(() => {
    try {
      const umami = getUmami();
      const ref = document.referrer || undefined;
      if (umami && typeof (umami as UmamiObject).trackView === 'function') {
        (umami as UmamiObject).trackView?.('/hackathon', ref);
      }
      if (typeof umami === 'function') {
        umami('hackathon-redirect', { source: ref ? 'internal' : 'direct', path: '/hackathon' });
      } else if (umami && typeof umami.track === 'function') {
        umami.track('hackathon-redirect', { source: ref ? 'internal' : 'direct', path: '/hackathon' });
      }
    } catch {}
    const t = setTimeout(() => {
      window.location.replace(target);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Hedera Africa Hackathon | Hashgraph Online</title>
        <meta
          name="description"
          content="Redirecting to Hedera Africa Hackathon registration and details."
        />
        <link rel="canonical" href={target} />
      </Head>
      <main className="container margin-vert--xl">
        <h1>Redirecting to Hedera Africa Hackathon…</h1>
        <p>
          If you are not redirected, <a href={target}>open the Hedera Africa Hackathon page</a>.
        </p>
      </main>
    </>
  );
}
