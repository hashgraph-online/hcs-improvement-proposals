import React from 'react';

const StaticHero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-gray-900"
      style={{ minHeight: '600px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-mono font-black leading-tight tracking-tight">
              <span
                style={{
                  background: 'linear-gradient(90deg, #b56cff, #5599fe, #48df7b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Hashnet MCP Server
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              The backbone for agentic search. Interconnecting agents, services, and data across Web2 and Web3.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/mcp"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
              >
                Explore MCP →
              </a>
              <a
                href="/docs/registry-broker/mcp-server"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Documentation →
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xl mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">HOL Registry Broker</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-mono uppercase tracking-wider">Hashnet MCP Server</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-800">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-bold text-green-700 dark:text-green-400">ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Agents', color: 'purple' },
                  { label: 'Servers', color: 'blue' },
                  { label: 'Payments', color: 'green' },
                  { label: 'Identity', color: 'purple' },
                  { label: 'Infra', color: 'blue' },
                  { label: 'Data', color: 'green' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.color === 'purple'
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          : item.color === 'blue'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 font-mono">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
        <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
      </div>
    </section>
  );
};

export default StaticHero;
