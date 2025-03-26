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
} from 'recharts';
import Typography from '../components/Typography';
import { Card } from '../components/ui/card';
import { formatNumber } from '../lib/format';
import { useMonthlyStats } from '../hooks/useMonthlyStats';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

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
                      <Typography variant='h6' className='text-muted-foreground'>
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
    console.log('data is', data)
    return (
      <Layout
        title={`Analytics | ${siteConfig.title}`}
        description='The data behind Hashgraph Online'
      >
        <div className='min-h-screen bg-slate-200 p-4'>
          <div className='container mx-auto'>
            <div className='h-96 animate-pulse rounded-lg bg-muted' />
          </div>
        </div>
      </Layout>
    );
  }

  const chartData = data.chartData.map((stat) => ({
    date: stat.date,
    nfts: stat.nfts,
    hcs1Transactions: stat.hcs1Transactions,
    hcs20Transactions: stat.hcs20Transactions,
    topics: stat.topics,
  }));

  console.log('chart data is', chartData)

  return (
    <Layout
      title={`Analytics | ${siteConfig.title}`}
      description='The data behind Hashgraph Online'
    >
      <div className='min-h-screen bg-slate-200 p-4'>
        <div className='container mx-auto space-y-8'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <ChartCard
              title='Hashinals'
              value={formatNumber(data.totalNfts)}
              color='rgb(98, 79, 255)'
              data={chartData}
              dataKey='nfts'
              description='Total Hashinals Minted'
              gradientId='nftGradient'
              startColor='#624fff'
              endColor='#624fff'
            />
            <ChartCard
              title='HCS-1 Transactions'
              value={formatNumber(chartData.reduce((acc, curr) => acc + curr.hcs1Transactions, 0))}
              color='rgb(48, 183, 82)'
              data={chartData}
              dataKey='hcs1Transactions'
              description='Total HCS-1 transactions'
              gradientId='hcs1Gradient'
              startColor='#30b752'
              endColor='#30b752'
            />
            <ChartCard
              title='HCS-20 Transactions'
              value={formatNumber(chartData.reduce((acc, curr) => acc + curr.hcs20Transactions, 0))}
              color='rgb(45, 212, 191)'
              data={chartData}
              dataKey='hcs20Transactions'
              description='Total HCS-20 transactions'
              gradientId='hcs20Gradient'
              startColor='#2dd4bf'
              endColor='#2dd4bf'
            />
            <ChartCard
              title='Topics'
              value={formatNumber(chartData.reduce((acc, curr) => acc + curr.topics, 0))}
              color='rgb(64, 25, 232)'
              data={chartData}
              dataKey='topics'
              description='Total topics created'
              gradientId='topicGradient'
              startColor='#4019e8'
              endColor='#4019e8'
            />
          </div>

          <Card className='p-6 overflow-hidden bg-white dark:bg-gray-900'>
            <Typography variant='h4' className='mb-6'>
              Monthly Activity Overview
            </Typography>
            <div className='h-[500px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id='nftGradientCombined' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#624fff' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#624fff' stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id='hcs1GradientCombined' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#30b752' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#30b752' stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id='hcs20GradientCombined' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#2dd4bf' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#2dd4bf' stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id='topicGradientCombined' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#4019e8' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#4019e8' stopOpacity={0.2} />
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
                      if (active && payload?.length) {
                        return (
                          <div className='rounded-lg bg-background/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md'>
                            <Typography variant='h6' className='text-muted-foreground'>
                              {payload[0].payload.date}
                            </Typography>
                            <Typography variant='p' className='text-[#624fff]'>
                              NFTs: {formatNumber(payload[0].value)}
                            </Typography>
                            <Typography variant='p' className='text-[#30b752]'>
                              HCS-1: {formatNumber(payload[1].value)}
                            </Typography>
                            <Typography variant='p' className='text-[#2dd4bf]'>
                              HCS-20: {formatNumber(payload[2].value)}
                            </Typography>
                            <Typography variant='p' className='text-[#4019e8]'>
                              Topics: {formatNumber(payload[3].value)}
                            </Typography>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Area
                    type='monotone'
                    dataKey='nfts'
                    stroke='#624fff'
                    fillOpacity={1}
                    fill='url(#nftGradientCombined)'
                    name='NFTs'
                  />
                  <Area
                    type='monotone'
                    dataKey='hcs1Transactions'
                    stroke='#30b752'
                    fillOpacity={1}
                    fill='url(#hcs1GradientCombined)'
                    name='HCS-1'
                  />
                  <Area
                    type='monotone'
                    dataKey='hcs20Transactions'
                    stroke='#2dd4bf'
                    fillOpacity={1}
                    fill='url(#hcs20GradientCombined)'
                    name='HCS-20'
                  />
                  <Area
                    type='monotone'
                    dataKey='topics'
                    stroke='#4019e8'
                    fillOpacity={1}
                    fill='url(#topicGradientCombined)'
                    name='Topics'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsClientPage;
