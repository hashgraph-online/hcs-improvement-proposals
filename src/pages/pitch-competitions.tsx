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
