import React from "react";
import Layout from "@theme/Layout";
import Typography from "../components/ui/Typography";

const HederaAISpeakersPage: React.FC = () => {
  return (
    <Layout
      title="Hedera x AI Speakers | Hashgraph Online"
      description="Apply to participate as a speaker in Hedera x AI events and discussions."
    >
      <main className="bg-white dark:bg-gray-950 min-h-screen py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-8 max-w-3xl">
              <Typography variant="h1" className="mb-3">
                Hedera x AI Speakers
              </Typography>
              <Typography variant="body" color="muted">
                Apply to participate as a speaker for Hedera x AI events and discussions.
                We’re looking for practical sessions on AI agents, on-chain identity, and
                standards-driven interoperability.
              </Typography>
              <div className="mt-4">
                <Typography variant="body2" color="muted">
                  Recommended submission details:
                </Typography>
                <ul className="mt-2 list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                  <li>A short abstract and key talking points</li>
                  <li>Any demos, repos, or slides you can share</li>
                  <li>Your preferred format (talk, panel, workshop)</li>
                  <li>Availability and timezone</li>
                </ul>
              </div>
              <Typography variant="body2" color="muted" className="mt-4">
                Topics we love include interoperable agent identities, registry discovery,
                auditability, and real-world deployment stories. If you have metrics or
                concrete lessons learned, include them.
              </Typography>
              <Typography variant="body2" color="muted" className="mt-4">
                If the embed below doesn’t load, open the application form directly:{' '}
                <a
                  href="https://dust-rayon-2dd.notion.site/ebd/2a8ce33e088a81278ecdf1964cedd746"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hedera x AI speaker application
                </a>
                .
              </Typography>
            </header>
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-800 dark:shadow-brand-purple/20 min-h-[1200px]">
              <iframe
                src="https://dust-rayon-2dd.notion.site/ebd/2a8ce33e088a81278ecdf1964cedd746"
                width="100%"
                height="1200"
                frameBorder="0"
                allowFullScreen
                className="h-[1200px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HederaAISpeakersPage;
