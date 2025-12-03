import React from 'react';
import Layout from '@theme/Layout';
import Typography from '../components/ui/Typography';

const PatchworkSpeakersPage: React.FC = () => {
  return (
    <Layout
      title='Patchwork: Syncing on Standards Speakers | Hashgraph Online'
      description='Apply to participate as a speaker in the Patchwork Event.'
    >
      <main className='bg-white dark:bg-gray-950 min-h-screen py-16'>
        <div className='mx-auto max-w-[1400px] px-4 lg:px-12'>
          <div className='mx-auto w-full max-w-6xl'>
            <div className='w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-800 dark:shadow-brand-purple/20 min-h-[1200px]'>
              <iframe
                src='https://dust-rayon-2dd.notion.site/ebd/2bcce33e088a80058096ea73bb5b3ff2'
                width='100%'
                height='1200'
                frameBorder='0'
                allowFullScreen
                className='h-[1200px] w-full'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PatchworkSpeakersPage;
