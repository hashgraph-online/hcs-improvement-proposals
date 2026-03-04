import React, { useMemo, useState } from 'react';
import type { TooltipProps } from 'recharts';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// ─── Types ───────────────────────────────────────────────────────────────────

type RegistryDatum = {
  name: string;
  count: number;
  color: string;
  share: number;
};

type RegistryDistributionChartProps = {
  data?: RegistryDatum[];
};

// ─── Color Palette ───────────────────────────────────────────────────────────

const COLORS = [
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#06B6D4', // cyan
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#3B82F6', // blue
  '#14B8A6', // teal
  '#F97316', // orange
  '#84CC16', // lime
  '#A855F7', // purple
  '#22D3EE', // light cyan
  '#FB923C', // light orange
  '#4ADE80', // light green
];

// ─── Default Data (injected by the auto-generator, this is the fallback) ────

const DEFAULT_DATA: RegistryDatum[] = [
  { name: 'AgentVerse', count: 36338, color: COLORS[0], share: 34.8 },
  { name: 'ERC-8004', count: 18344, color: COLORS[1], share: 17.6 },
  { name: 'PulseMCP', count: 16510, color: COLORS[2], share: 15.8 },
  { name: 'Moltbook', count: 14436, color: COLORS[3], share: 13.8 },
  { name: 'x402 Bazaar', count: 7606, color: COLORS[4], share: 7.3 },
  { name: 'Virtuals Protocol', count: 6983, color: COLORS[5], share: 6.7 },
  { name: 'NANDA', count: 2702, color: COLORS[6], share: 2.6 },
  { name: 'OpenRouter', count: 535, color: COLORS[7], share: 0.5 },
  { name: 'Others', count: 897, color: COLORS[8], share: 0.9 },
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const chartStyles = `
  .registry-dist-chart {
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 16px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    background: var(--ifm-card-background-color, #ffffff);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  [data-theme='dark'] .registry-dist-chart {
    border-color: rgba(148, 163, 184, 0.3);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.4);
  }
  .rdc__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .rdc__title {
    font-weight: 700;
    font-size: 1.15rem;
    color: #0f172a;
    margin: 0;
  }
  [data-theme='dark'] .rdc__title {
    color: #e2e8f0;
  }
  .rdc__subtitle {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }
  [data-theme='dark'] .rdc__subtitle {
    color: #94a3b8;
  }
  .rdc__toggle-group {
    display: flex;
    gap: 0.25rem;
    background: rgba(15, 23, 42, 0.06);
    border-radius: 10px;
    padding: 3px;
  }
  [data-theme='dark'] .rdc__toggle-group {
    background: rgba(148, 163, 184, 0.12);
  }
  .rdc__toggle {
    padding: 0.4rem 0.85rem;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: #64748b;
    transition: all 0.2s ease;
  }
  .rdc__toggle.active {
    background: var(--ifm-color-primary, #6366F1);
    color: white;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }
  [data-theme='dark'] .rdc__toggle {
    color: #94a3b8;
  }
  .rdc__chart-area {
    width: 100%;
    min-height: 350px;
  }
  .rdc__tooltip {
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(8px);
    color: #f8fafc;
    padding: 0.6rem 0.85rem;
    border-radius: 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  .rdc__tooltip-name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  .rdc__tooltip-value {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .rdc__tooltip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .rdc__stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }
  .rdc__stat-card {
    background: rgba(15, 23, 42, 0.04);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    text-align: center;
  }
  [data-theme='dark'] .rdc__stat-card {
    background: rgba(148, 163, 184, 0.08);
  }
  .rdc__stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ifm-color-primary, #6366F1);
    letter-spacing: -0.5px;
  }
  .rdc__stat-label {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 2px;
  }
  [data-theme='dark'] .rdc__stat-label {
    color: #94a3b8;
  }
  .rdc__note {
    font-size: 0.75rem;
    color: #94a3b8;
    text-align: center;
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

const RegistryDistributionChart: React.FC<RegistryDistributionChartProps> = ({
  data: propData,
}) => {
  const data = useMemo(() => {
    if (propData) return propData;
    return DEFAULT_DATA;
  }, [propData]);

  const [view, setView] = useState<'pie' | 'bar'>('pie');

  const totalAgents = useMemo(
    () => data.reduce((sum, d) => sum + d.count, 0),
    [data]
  );

  const topRegistries = data.filter((d) => d.count > 500);

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0];
    const entry = data.find(
      (d) => d.name === (item.name || (item.payload as RegistryDatum)?.name)
    );
    if (!entry) return null;

    return (
      <div className="rdc__tooltip">
        <div className="rdc__tooltip-name">{entry.name}</div>
        <div className="rdc__tooltip-value">
          <span
            className="rdc__tooltip-dot"
            style={{ background: entry.color }}
          />
          {entry.count.toLocaleString()} agents ({entry.share}%)
        </div>
      </div>
    );
  };

  return (
    <div className="registry-dist-chart">
      <style>{chartStyles}</style>

      {/* Header */}
      <div className="rdc__header">
        <div>
          <h3 className="rdc__title">Registry Distribution</h3>
          <p className="rdc__subtitle">
            {totalAgents.toLocaleString()} agents across{' '}
            {data.length} registries
          </p>
        </div>
        <div className="rdc__toggle-group">
          <button
            type="button"
            className={`rdc__toggle ${view === 'pie' ? 'active' : ''}`}
            onClick={() => setView('pie')}
          >
            Pie
          </button>
          <button
            type="button"
            className={`rdc__toggle ${view === 'bar' ? 'active' : ''}`}
            onClick={() => setView('bar')}
          >
            Bar
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="rdc__stat-grid">
        <div className="rdc__stat-card">
          <div className="rdc__stat-value">
            {totalAgents.toLocaleString()}
          </div>
          <div className="rdc__stat-label">Total Agents</div>
        </div>
        <div className="rdc__stat-card">
          <div className="rdc__stat-value">{data.length}</div>
          <div className="rdc__stat-label">Registries</div>
        </div>
        <div className="rdc__stat-card">
          <div className="rdc__stat-value">{data[0]?.name || '—'}</div>
          <div className="rdc__stat-label">Largest Registry</div>
        </div>
        <div className="rdc__stat-card">
          <div className="rdc__stat-value">{data[0]?.share || 0}%</div>
          <div className="rdc__stat-label">Top Share</div>
        </div>
      </div>

      {/* Chart */}
      <div className="rdc__chart-area">
        <ResponsiveContainer width="100%" height={350}>
          {view === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={65}
                paddingAngle={2}
                stroke="none"
                label={({ name, share }) =>
                  share >= 5 ? `${name} (${share}%)` : ''
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart
              data={topRegistries}
              layout="vertical"
              margin={{ top: 8, right: 30, bottom: 8, left: 120 }}
            >
              <XAxis
                type="number"
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
                }
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" barSize={20} radius={[0, 6, 6, 0]}>
                {topRegistries.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <p className="rdc__note">
        Data sourced from the{' '}
        <a href="https://hol.org/registry/api/v1/stats">
          HOL Registry Broker API
        </a>
        . Toggle between pie and bar views.
      </p>
    </div>
  );
};

export default RegistryDistributionChart;
