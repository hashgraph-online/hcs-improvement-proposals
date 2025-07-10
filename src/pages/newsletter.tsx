import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

const NewsletterPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Redirect to hackathon page with newsletter modal open
    // You could also implement a standalone newsletter signup here
    history.push('/hackathon#newsletter');
  }, [history]);

  return (
    <Layout
      title='Newsletter Signup | Hashgraph Online'
      description='Subscribe to get the latest updates, workshops, and exclusive resources from Hashgraph Online.'
    >
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Redirecting to newsletter signup...</h1>
          <p className='text-gray-600'>You will be redirected shortly.</p>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterPage;