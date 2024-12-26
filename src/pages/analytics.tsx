'use client';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts';
import Typography from '../components/Typography';
import { Card } from '../components/ui/card';
import { formatNumber } from '../lib/format';
import { useMonthlyStats } from '../hooks/useMonthlyStats';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type ChartCardProps = {
  title: string;
  value: string;
  color: string;
  data: any[];
  dataKey: string;
  description?: string;
  gradientId: string;
  startColor: string;
  endColor: string;
};

const ChartCard = ({
  title,
  value,
  color,
  data,
  dataKey,
  description,
  gradientId,
  startColor,
  endColor,
}: ChartCardProps) => {
  const total = data.reduce((acc, curr) => acc + curr[dataKey], 0);

  return (
    <Card className='p-6 overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300 group'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <Typography variant='h5' className='mb-2 text-muted-foreground'>
            {title}
          </Typography>
          <div className='group/number relative'>
            <Typography variant='h3' style={{ color }}>
              {value}
            </Typography>
            <div className='absolute -bottom-6 left-0 opacity-0 group-hover/number:opacity-100 transition-opacity duration-200 text-xs font-mono text-muted-foreground'>
              {total.toString()}
            </div>
          </div>
          {description && (
            <Typography variant='p' className='text-muted-foreground mt-6'>
              {description}
            </Typography>
          )}
        </div>
      </div>
      <div className='h-[200px] mt-4 group-hover:scale-105 transition-transform duration-300'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={startColor} stopOpacity={0.8} />
                <stop offset='100%' stopColor={endColor} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
            <XAxis
              dataKey='date'
              stroke='currentColor'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              stroke='currentColor'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const rawValue = payload[0].value as number;
                  return (
                    <div className='rounded-lg bg-background/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md'>
                      <Typography
                        variant='h6'
                        className='text-muted-foreground'
                      >
                        {payload[0].payload.date}
                      </Typography>
                      <div className='group/tooltip relative'>
                        <Typography variant='p' style={{ color }}>
                          {title}: {formatNumber(rawValue)}
                        </Typography>
                        <div className='absolute -bottom-4 left-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 text-xs font-mono text-muted-foreground'>
                          {rawValue.toString()}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type='monotone'
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const AnalyticsClientPage = () => {
  const { data, isLoading } = useMonthlyStats();

  const { siteConfig } = useDocusaurusContext();

  if (isLoading || !data) {
    return (
      <Layout
        title={`Analytics | ${siteConfig.title}`}
        description='Learn about the companies and organizations that are building Hashgraph Online'
      >
        <div className='min-h-screen bg-gradient-to-b from-background/10 to-background/80 p-4'>
          <div className='container mx-auto'>
            <div className='h-96 animate-pulse rounded-lg bg-muted' />
          </div>
        </div>
      </Layout>
    );
  }

  const totalTransactions = data.chartData.reduce(
    (acc, curr) => acc + curr.transactions,
    0
  );
  const totalTopics = data.chartData.reduce(
    (acc, curr) => acc + curr.topics,
    0
  );

  return (
    <Layout
      title={`Analytics | ${siteConfig.title}`}
      description='The data behind Hashgraph Online'
    >
      <div className='bg-slate-200 min-h-screen p-4'>
        <div className='container mx-auto space-y-8'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <ChartCard
              title='NFTs Minted'
              value={formatNumber(data.totalNfts)}
              color='rgb(98, 79, 255)'
              data={data.chartData}
              dataKey='nfts'
              description='Total NFTs minted on the platform'
              gradientId='nftGradient'
              startColor='#624fff'
              endColor='#624fff'
            />
            <ChartCard
              title='Transactions'
              value={formatNumber(totalTransactions)}
              color='rgb(48, 183, 82)'
              data={data.chartData}
              dataKey='transactions'
              description='Total transactions processed'
              gradientId='txGradient'
              startColor='#30b752'
              endColor='#30b752'
            />
            <ChartCard
              title='Topics'
              value={formatNumber(totalTopics)}
              color='rgb(64, 25, 232)'
              data={data.chartData}
              dataKey='topics'
              description='Total topics created'
              gradientId='topicGradient'
              startColor='#4019e8'
              endColor='#4019e8'
            />
          </div>

          <Card className='p-6 overflow-hidden bg-white dark:bg-gray-900'>
            <Typography variant='h4' className='mb-6'>
              Activity Comparison
            </Typography>
            <div className='h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={data.chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
                  <XAxis
                    dataKey='date'
                    stroke='currentColor'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke='currentColor'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className='rounded-lg bg-background/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md'>
                            <Typography
                              variant='h6'
                              className='text-muted-foreground'
                            >
                              {payload[0].payload.date}
                            </Typography>
                            <div className='space-y-1'>
                              <div className='group/tooltip relative'>
                                <Typography
                                  variant='p'
                                  className='text-[rgb(98,79,255)]'
                                >
                                  NFTs:{' '}
                                  {formatNumber(payload[0].value as number)}
                                </Typography>
                                <div className='absolute -bottom-4 left-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 text-xs font-mono text-muted-foreground'>
                                  {payload[0].value}
                                </div>
                              </div>
                              <div className='group/tooltip relative'>
                                <Typography
                                  variant='p'
                                  className='text-[rgb(48,183,82)]'
                                >
                                  Transactions:{' '}
                                  {formatNumber(payload[1].value as number)}
                                </Typography>
                                <div className='absolute -bottom-4 left-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 text-xs font-mono text-muted-foreground'>
                                  {payload[1].value}
                                </div>
                              </div>
                              <div className='group/tooltip relative'>
                                <Typography
                                  variant='p'
                                  className='text-[rgb(64,25,232)]'
                                >
                                  Topics:{' '}
                                  {formatNumber(payload[2].value as number)}
                                </Typography>
                                <div className='absolute -bottom-4 left-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 text-xs font-mono text-muted-foreground'>
                                  {payload[2].value}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey='nfts'
                    name='NFTs'
                    fill='rgb(98, 79, 255)'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='transactions'
                    name='Transactions'
                    fill='rgb(48, 183, 82)'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='topics'
                    name='Topics'
                    fill='rgb(64, 25, 232)'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsClientPage;
