import { useEffect, useState } from 'react';

export type MonthlyStatsResponse = {
  monthlyStats: {
    year: number;
    month: number;
    monthFormatted: string;
    transactionCount: number;
    topicCount: number;
    nftCount: number;
    hcs20Stats: {
      transactionCount: number;
      totalHolders: number;
      mintedSupply: number;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalNfts: number;
};

export type ChartDataPoint = {
  date: string;
  nfts: number;
  hcs1Transactions: number;
  hcs20Transactions: number;
  topics: number;
};

const fetchMonthlyStats = async (): Promise<MonthlyStatsResponse> => {
  const response = await fetch('https://kiloscribe.com/api/hashinal/monthly-stats');
  if (!response.ok) {
    throw new Error('Failed to fetch monthly stats');
  }
  return response.json();
};

export const useMonthlyStats = () => {
  const [data, setData] = useState<{ chartData: ChartDataPoint[]; totalNfts: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchMonthlyStats();

        const chartData = rawData.monthlyStats.map((stat) => ({
          date: stat.monthFormatted,
          nfts: stat.nftCount,
          hcs1Transactions: stat.transactionCount,
          hcs20Transactions: stat.hcs20Stats.transactionCount,
          topics: stat.topicCount,
        }));

        setData({
          chartData,
          totalNfts: rawData.totalNfts,
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
