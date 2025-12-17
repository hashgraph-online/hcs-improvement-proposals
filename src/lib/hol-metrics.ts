export type HolMonthlyStatsResponse = {
  monthlyStats: Array<{
    specTopicCounts?: Record<string, number>;
    hcs20Stats?: { transactionCount?: number };
  }>;
  totalNfts: number;
  hcs1TotalMessages: number;
};

export type HolProductionMetrics = {
  totalOnChainTransactions: number;
  hcs1TopicsCreated: number;
};

const HOL_MONTHLY_STATS_URL = 'https://hol.org/points/api/hashinal/monthly-stats?range=all';
const HOL_HCS20_TOPIC_MESSAGES_URL = 'https://hol.org/points/api/analytics/hcs20-topic-messages?range=all';
const CACHE_KEY = 'hol:monthly-stats:metrics:v2';
const CACHE_TTL_MS = 10 * 60 * 1000;

type CachedValue = {
  savedAtMs: number;
  value: HolProductionMetrics;
};

const parseNumber = (value: unknown): number | null => {
  if (typeof value !== 'number') return null;
  if (!Number.isFinite(value)) return null;
  return value;
};

const sumNumbers = (values: number[]): number => values.reduce((total, value) => total + value, 0);

const sumRecordValues = (record: Record<string, number> | undefined): number => {
  if (!record) return 0;
  return Object.values(record).reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0);
};

const tryReadCache = (): HolProductionMetrics | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedValue;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.savedAtMs !== 'number' || !Number.isFinite(parsed.savedAtMs)) return null;
    if (Date.now() - parsed.savedAtMs > CACHE_TTL_MS) return null;
    const value = parsed.value as Partial<HolProductionMetrics> | undefined;
    if (!value) return null;
    if (typeof value.totalOnChainTransactions !== 'number' || !Number.isFinite(value.totalOnChainTransactions)) return null;
    if (typeof value.hcs1TopicsCreated !== 'number' || !Number.isFinite(value.hcs1TopicsCreated)) return null;
    return { totalOnChainTransactions: value.totalOnChainTransactions, hcs1TopicsCreated: value.hcs1TopicsCreated };
  } catch {
    return null;
  }
};

const writeCache = (value: HolProductionMetrics): void => {
  if (typeof window === 'undefined') return;
  try {
    const payload: CachedValue = { savedAtMs: Date.now(), value };
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
  }
};

export const fetchHolProductionMetrics = async (signal?: AbortSignal): Promise<HolProductionMetrics | null> => {
  const cached = tryReadCache();
  if (cached) return cached;

  const [monthlyResponse, hcs20Response] = await Promise.all([
    fetch(HOL_MONTHLY_STATS_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      signal,
    }),
    fetch(HOL_HCS20_TOPIC_MESSAGES_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      signal,
    }).catch(() => null),
  ]);

  if (!monthlyResponse.ok) return null;

  const json = (await monthlyResponse.json()) as unknown;
  if (!json || typeof json !== 'object') return null;

  const root = json as Record<string, unknown>;
  const monthlyStats = Array.isArray(root.monthlyStats) ? root.monthlyStats : null;
  const totalNfts = parseNumber(root.totalNfts);
  const hcs1TotalMessages = parseNumber(root.hcs1TotalMessages);
  if (!monthlyStats || totalNfts === null || hcs1TotalMessages === null) return null;

  const totalHcs20MonthlyOps = sumNumbers(
    monthlyStats.map((entry) => {
      if (!entry || typeof entry !== 'object') return 0;
      const hcs20 = (entry as Record<string, unknown>).hcs20Stats;
      if (!hcs20 || typeof hcs20 !== 'object') return 0;
      const count = parseNumber((hcs20 as Record<string, unknown>).transactionCount);
      return count ?? 0;
    }),
  );

  const totalHcs20TopicMessages = await (async (): Promise<number | null> => {
    if (!hcs20Response || !hcs20Response.ok) return null;
    try {
      const payload = (await hcs20Response.json()) as unknown;
      if (!payload || typeof payload !== 'object') return null;
      const count = parseNumber((payload as Record<string, unknown>).totalMessages);
      return count ?? null;
    } catch {
      return null;
    }
  })();

  const totalTopicsCreatedAllSpecs = sumNumbers(
    monthlyStats.map((entry) => {
      if (!entry || typeof entry !== 'object') return 0;
      const specCounts = (entry as Record<string, unknown>).specTopicCounts;
      if (!specCounts || typeof specCounts !== 'object') return 0;
      return sumRecordValues(specCounts as Record<string, number>);
    }),
  );

  const hcs1TopicsCreated = sumNumbers(
    monthlyStats.map((entry) => {
      if (!entry || typeof entry !== 'object') return 0;
      const specCounts = (entry as Record<string, unknown>).specTopicCounts;
      if (!specCounts || typeof specCounts !== 'object') return 0;
      const value = (specCounts as Record<string, unknown>)['hcs-1'];
      const count = parseNumber(value);
      return count ?? 0;
    }),
  );

  const value: HolProductionMetrics = {
    totalOnChainTransactions:
      hcs1TotalMessages +
      totalNfts +
      totalTopicsCreatedAllSpecs +
      (totalHcs20TopicMessages ?? totalHcs20MonthlyOps),
    hcs1TopicsCreated,
  };

  writeCache(value);
  return value;
};
