import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MemberSection } from '../components/members/MemberSection';

const UseCasesPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Members | ${siteConfig.title}`}
      description='Learn about the companies and organizations that are building Hashgraph Online'
    >
      <main className='bg-black'>
        <section className='flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8 md:py-36 px-4 md:px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-2xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
              Hashgraph Online Members
            </h1>
            <p className='text-sm md:text-xl lg:text-2xl mb-3 md:mb-8 text-gray-300'>
              Learn about the companies and organizations that are building
              Hashgraph Online
            </p>
            <Link
              to='#members'
              className='inline-block bg-white text-black font-bold py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-base hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg'
            >
              Explore Members
            </Link>
          </div>
        </section>

        <div id='members'>
          <MemberSection />
        </div>
      </main>
    </Layout>
  );
};

export default UseCasesPage;
