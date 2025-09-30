import React, { useMemo, useState } from 'react';
import type { TooltipProps } from 'recharts';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

type CityDatum = {
  name: string;
  gw: number;
  color: string;
};

const CITY_DATA: CityDatum[] = [
  { name: 'New York, NY', gw: 2.63, color: '#4F46E5' },
  { name: 'Houston, TX', gw: 1.44, color: '#6366F1' },
  { name: 'Chicago, IL', gw: 1.08, color: '#818CF8' },
  { name: 'Los Angeles, CA', gw: 0.98, color: '#A5B4FC' },
  { name: 'Phoenix, AZ', gw: 0.90, color: '#60A5FA' },
  { name: 'San Antonio, TX', gw: 0.86, color: '#38BDF8' },
  { name: 'Dallas, TX', gw: 0.84, color: '#0EA5E9' },
  { name: 'Austin, TX', gw: 0.75, color: '#06B6D4' },
  { name: 'Philadelphia, PA', gw: 0.75, color: '#14B8A6' },
  { name: 'Jacksonville, FL', gw: 0.62, color: '#22C55E' },
  { name: 'Fort Worth, TX', gw: 0.54, color: '#84CC16' },
  { name: 'Charlotte, NC', gw: 0.51, color: '#EAB308' },
  { name: 'Seattle, WA', gw: 0.49, color: '#FACC15' },
  { name: 'San Diego, CA', gw: 0.36, color: '#F97316' },
  { name: 'Atlanta, GA', gw: 0.33, color: '#FB923C' },
  { name: 'Denver, CO', gw: 0.31, color: '#F472B6' },
  { name: 'Miami, FL', gw: 0.31, color: '#E879F9' },
  { name: 'Las Vegas, NV', gw: 0.30, color: '#C084FC' },
  { name: 'Washington, DC', gw: 0.29, color: '#A855F7' },
  { name: 'San Francisco, CA', gw: 0.25, color: '#7C3AED' },
];

const AI_TOTAL_GW = 14.5;
const AI_HOMES_EQUIV = '12.4M';

const chartStyles = `
  .city-compute-chart {
    --chart-border: rgba(15, 23, 42, 0.12);
    --chart-border-dark: rgba(148, 163, 184, 0.3);
    --chart-track: rgba(15, 23, 42, 0.08);
    --chart-track-dark: rgba(148, 163, 184, 0.18);
    --chart-text-muted: #475569;
    border: 1px solid var(--chart-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    background: var(--ifm-card-background-color, #ffffff);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
  }
  [data-theme='dark'] .city-compute-chart {
    border-color: var(--chart-border-dark);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.4);
    --chart-text-muted: #cbd5f5;
  }
  .city-compute-chart .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .chart__section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .chart__title {
    font-weight: 600;
    font-size: 1rem;
    color: #0f172a;
  }
  [data-theme='dark'] .chart__title {
    color: #e2e8f0;
  }
  .chart__subtitle {
    font-size: 0.8rem;
    color: var(--chart-text-muted);
  }
  .chart__bars {
    width: 100%;
    height: 220px;
  }
  .chart__tooltip {
    background: rgba(15, 23, 42, 0.92);
    color: #f8fafc;
    padding: 0.5rem 0.65rem;
    border-radius: 8px;
    font-size: 0.75rem;
    line-height: 1.35;
  }
  .chart__tooltip-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .chart__tooltip-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
  }
  .chart__key {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.45rem 0.8rem;
  }
  .chart__key-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(15, 23, 42, 0.05);
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    color: #0f172a;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease, border-color 0.15s ease;
  }
  .chart__key-button:hover {
    transform: translateY(-1px);
    border-color: rgba(15, 23, 42, 0.15);
  }
  .chart__key-button.is-hidden {
    opacity: 0.35;
  }
  [data-theme='dark'] .chart__key-button {
    background: rgba(148, 163, 184, 0.1);
    color: #e2e8f0;
    border-color: transparent;
  }
  .chart__swatch {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 4px;
    margin-right: 0.5rem;
  }
  .chart__key-gw {
    font-variant-numeric: tabular-nums;
    margin-left: 0.35rem;
    color: var(--chart-text-muted);
  }
  .chart__note {
    font-size: 0.75rem;
    color: var(--chart-text-muted);
    line-height: 1.4;
  }
`;

const CityComputeChart: React.FC = () => {
  const [hiddenCities, setHiddenCities] = useState<Set<string>>(new Set());

  const visibleCities = useMemo(
    () => CITY_DATA.filter((city) => !hiddenCities.has(city.name)),
    [hiddenCities]
  );

  const totalResidential = useMemo(
    () => visibleCities.reduce((sum, city) => sum + city.gw, 0),
    [visibleCities]
  );

  const stackedData = useMemo(() => {
    const cityNames = CITY_DATA.map((city) => city.name);

    const aiRow: Record<string, number | string> = {
      segment: 'New AI compute',
      ai: AI_TOTAL_GW,
    };
    cityNames.forEach((name) => {
      aiRow[name] = 0;
    });

    const residentialRow: Record<string, number | string> = {
      segment: 'Residential demand (stacked)',
      ai: 0,
    };
    cityNames.forEach((name) => {
      const city = visibleCities.find((item) => item.name === name);
      residentialRow[name] = city ? city.gw : 0;
    });

    return [aiRow, residentialRow];
  }, [visibleCities]);

  const lastVisibleCityName =
    visibleCities.length > 0 ? visibleCities[visibleCities.length - 1].name : undefined;

  const toggleCity = (name: string) => {
    setHiddenCities((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const renderTooltip = (props: TooltipProps<number, string>) => {
    if (!props.active || !props.payload || props.payload.length === 0) {
      return null;
    }

    const label = props.label as string;
    const rows = (props.payload ?? [])
      .filter((item) => typeof item.value === 'number' && item.value > 0)
      .map((item) => {
        const key = item.dataKey as string;
        const value = item.value as number;
        const color = key === 'ai'
          ? '#4338CA'
          : CITY_DATA.find((city) => city.name === key)?.color ?? '#0EA5E9';
        return { key, value, color };
      });

    return (
      <div className="chart__tooltip">
        <strong>{label}</strong>
        {rows.map((row) => (
          <span key={row.key} className="chart__tooltip-row">
            <span className="chart__tooltip-dot" style={{ background: row.color }} />
            {row.value.toFixed(2)} GW{row.key === 'ai' ? '' : ` (${row.key})`}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="city-compute-chart" role="group" aria-labelledby="city-compute-chart-title">
      <style>{chartStyles}</style>
      <span id="city-compute-chart-title" className="sr-only">
        Residential electricity of major U.S. cities versus new AI compute announcements (September 2025)
      </span>

      <section className="chart__section">
        <div className="chart__title">New AI compute vs. Residential demand</div>
        <div className="chart__subtitle">
          Residential bar is stacked by the cities that remain visible.
        </div>
        <div className="chart__bars">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={stackedData}
              layout="vertical"
              margin={{ top: 12, right: 24, bottom: 12, left: 48 }}
            >
              <XAxis
                type="number"
                domain={[0, 15]}
                tickFormatter={(value) => `${value} GW`}
                tick={{ fontSize: 11 }}
                ticks={[0, 5, 10, 15]}
              />
              <YAxis type="category" dataKey="segment" tick={{ fontSize: 12 }} width={180} />
              <Tooltip
                cursor={{ fill: 'rgba(79, 70, 229, 0.12)' }}
                wrapperStyle={{ outline: 'none' }}
                content={renderTooltip}
              />
              <Bar dataKey="ai" stackId="compare" barSize={28} radius={[0, 6, 6, 0]} fill="#4338CA" />
              {CITY_DATA.map((city) => {
                const radius: [number, number, number, number] =
                  lastVisibleCityName === city.name ? [0, 6, 6, 0] : [0, 0, 0, 0];
                return (
                  <Bar
                    key={city.name}
                    dataKey={city.name}
                    stackId="compare"
                    barSize={28}
                    radius={radius}
                    fill={city.color}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart__meta">
          Residential total (visible cities): {totalResidential.toFixed(2)} GW
        </div>
      </section>

      <section className="chart__section" aria-label="City demand legend">
        <div className="chart__title" style={{ fontSize: '0.95rem' }}>
          Toggle cities to adjust the residential bar
        </div>
        <div className="chart__key">
          {CITY_DATA.map((city) => {
            const isHidden = hiddenCities.has(city.name);
            return (
              <button
                type="button"
                key={city.name}
                className={`chart__key-button${isHidden ? ' is-hidden' : ''}`}
                onClick={() => toggleCity(city.name)}
                aria-pressed={!isHidden}
              >
                <span className="chart__swatch" style={{ background: city.color }} />
                <span className="chart__key-name">{city.name}</span>
                <span className="chart__key-gw">{city.gw.toFixed(2)} GW</span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="chart__note">
        Sources: ACS 2023 households; EIA 2023 state average monthly residential kWh. AI compute = announced capacity in the past ~30 days (OpenAI-NVIDIA LOI, Stargate, Oracle, Google, Microsoft). May include overlaps.
        <br />
        {AI_TOTAL_GW} GW ~ {AI_HOMES_EQUIV} U.S. homes (EIA 2023 average).
      </p>
    </div>
  );
};

export default CityComputeChart;
