import React from 'react';
import Layout from '@theme-original/Layout';
import type { Props } from '@theme/Layout';

export default function LayoutWrapper(props: Props): JSX.Element {
  return <Layout {...props} />;
}
