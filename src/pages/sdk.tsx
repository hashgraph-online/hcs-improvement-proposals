import React, { useEffect } from 'react';
import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';

export default function SDK() {
  const redirectUrl =
    'https://hol.org/docs/libraries/standards-sdk/';

  useEffect(() => {
    window.location.href = redirectUrl;
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv='refresh' content={`0;url=${redirectUrl}`} />
      </Head>
      <Redirect to={redirectUrl} />
    </>
  );
}
