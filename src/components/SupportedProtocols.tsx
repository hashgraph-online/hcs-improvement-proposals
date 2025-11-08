import React, { useEffect, useState } from 'react';

type AdapterStat = {
  name: string;
  version: string;
  status: string;
  agentCount: number;
  registryType: string;
  health: string;
};

type DashboardStats = {
  adapters: AdapterStat[];
  agentsByProtocol: Record<string, number>;
};

const API_URL = 'https://registry.hashgraphonline.com/api/v1/dashboard/stats';

const SupportedProtocols = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Protocol dashboard fetch failed ${res.status}`);
        }
        return res.json();
      })
      .then(body => {
        setStats({
          adapters: body.adapters ?? [],
          agentsByProtocol: body.agentsByProtocol ?? {},
        });
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading supported protocols…</p>;
  }

  if (error) {
    return <p>Unable to load protocols ({error})</p>;
  }

  if (!stats) {
    return <p>No protocol data available.</p>;
  }

  return (
    <div>
      <h3>Live Protocol Support</h3>
      <table>
        <thead>
          <tr>
            <th>Adapter</th>
            <th>Version</th>
            <th>Status</th>
            <th>Registry Type</th>
            <th>Agent Count</th>
            <th>Health</th>
          </tr>
        </thead>
        <tbody>
          {stats.adapters.map(adapter => (
            <tr key={adapter.name}>
              <td>{adapter.name}</td>
              <td>{adapter.version}</td>
              <td>{adapter.status}</td>
              <td>{adapter.registryType}</td>
              <td>{adapter.agentCount.toLocaleString()}</td>
              <td>{adapter.health}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportedProtocols;
