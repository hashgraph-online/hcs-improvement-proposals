import { useEffect, useState } from 'react';

export type MonthlyStatsResponse = {
  monthlyStats: {
    year: number;
    month: number;
    monthFormatted: string;
    transactionCount: number;
    topicCount: number;
    nftCount: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalNfts: number;
};

export type ChartDataPoint = {
  date: string;
  transactions: number;
  topics: number;
  nfts: number;
};

const fetchMonthlyStats = async (): Promise<MonthlyStatsResponse> => {
  const response = await fetch('https://kiloscribe.com/api/hashinal/monthly-stats');
  if (!response.ok) {
    throw new Error('Failed to fetch monthly stats');
  }
  return response.json();
};

export const useMonthlyStats = () => {
  const [data, setData] = useState<{
    chartData: ChartDataPoint[];
    totalNfts: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchMonthlyStats();

        const chartData = rawData.monthlyStats.map((stat) => ({
          date: `${stat.year}-${String(stat.month).padStart(2, '0')}`,
          transactions: stat.transactionCount,
          topics: stat.topicCount,
          nfts: stat.nftCount,
        }));

        setData({
          chartData,
          totalNfts: rawData.totalNfts,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
