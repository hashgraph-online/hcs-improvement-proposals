import React from "react";
import Layout from "@theme/Layout";
import Typography from "../components/ui/Typography";

const PitchCompetitionsPage: React.FC = () => {
  return (
    <Layout
      title="Pitch Competitions | Hashgraph Online"
      description="Submit your projects to the latest Hashgraph Online pitch competitions."
    >
      <main className="bg-white dark:bg-gray-950 min-h-screen py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-8 max-w-3xl">
              <Typography variant="h1" className="mb-3">
                Pitch Competitions
              </Typography>
              <Typography variant="body" color="muted">
                Submit your project for upcoming Hashgraph Online pitch competitions. We
                review entries for technical clarity, real-world usefulness, and alignment
                with open standards on Hedera.
              </Typography>
              <div className="mt-4">
                <Typography variant="body2" color="muted">
                  Helpful details to include:
                </Typography>
                <ul className="mt-2 list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                  <li>What you built and who it’s for</li>
                  <li>The standards or APIs you’re using</li>
                  <li>A short demo video or screenshots</li>
                  <li>Links to code and documentation</li>
                </ul>
              </div>
              <div className="mt-4">
                <Typography variant="body2" color="muted">
                  Evaluation usually considers:
                </Typography>
                <ul className="mt-2 list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                  <li>Clarity of the problem and solution</li>
                  <li>Working demo and implementation quality</li>
                  <li>Security and user safety</li>
                  <li>Interoperability and standards alignment</li>
                </ul>
              </div>
              <Typography variant="body2" color="muted" className="mt-4">
                If the embed below doesn’t load, open the application form directly:
                {' '}
                <a
                  href="https://dust-rayon-2dd.notion.site/ebd/28bce33e088a8090b48cdbd8f5014eea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pitch competition application
                </a>
                .
              </Typography>
            </header>
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-800 dark:shadow-brand-purple/20 min-h-[1200px]">
              <iframe
                src="https://dust-rayon-2dd.notion.site/ebd/28bce33e088a8090b48cdbd8f5014eea"
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

export default PitchCompetitionsPage;
