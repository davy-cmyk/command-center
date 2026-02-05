/**
 * Command Center Events Library
 * In-memory storage with best-effort /tmp persistence
 */

export interface CommandEvent {
  id: string;
  reportId: string;
  vin: string;
  vinMasked: string;
  vehicleLabel: string;
  confidence: number;
  limitedReason: string | null;
  requestId: string;
  provider: string;
  providerSuccess: boolean;
  totalMs: number;
  createdAt: string;
}

export interface CommandStats {
  reports24h: number;
  reports7d: number;
  limitedPercent: number;
  avgComposeTime: number;
  ok: boolean;
}

export interface ProviderStats {
  provider: string;
  successRate: number;
  failures: number;
  lastFailure: string | null;
}

// In-memory storage
const events: CommandEvent[] = [];
const MAX_EVENTS = 10000;

// Provider tracking
const providerStats: Map<string, { success: number; failure: number; lastFailure: string | null }> = new Map();

// Helper to mask VIN (show first 4 and last 4, mask middle)
export function maskVin(vin: string): string {
  if (!vin || vin.length < 9) return vin;
  const first4 = vin.slice(0, 4);
  const last4 = vin.slice(-4);
  const masked = 'X'.repeat(vin.length - 8);
  return `${first4}${masked}${last4}`;
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// Log a new event
export function logEvent(
  event: Omit<CommandEvent, 'id' | 'vinMasked' | 'createdAt'> & { createdAt?: string }
): CommandEvent {
  const newEvent: CommandEvent = {
    ...event,
    id: generateId(),
    vinMasked: maskVin(event.vin),
    createdAt: event.createdAt || new Date().toISOString(),
  };

  // Add to in-memory storage
  events.unshift(newEvent);

  // Trim to max size
  if (events.length > MAX_EVENTS) {
    events.length = MAX_EVENTS;
  }

  // Update provider stats
  const current = providerStats.get(event.provider) || { success: 0, failure: 0, lastFailure: null };
  if (event.providerSuccess) {
    current.success++;
  } else {
    current.failure++;
    current.lastFailure = newEvent.createdAt;
  }
  providerStats.set(event.provider, current);

  // Best-effort persistence (fire and forget)
  persistEvents().catch(() => {});

  return newEvent;
}

// Get events with limit
export function getEvents(limit: number = 50): CommandEvent[] {
  try {
    return events.slice(0, Math.min(limit, MAX_EVENTS));
  } catch {
    return [];
  }
}

// Get stats
export function getStats(): CommandStats {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const reports24h = events.filter(e => new Date(e.createdAt) >= oneDayAgo).length;
    const reports7d = events.filter(e => new Date(e.createdAt) >= sevenDaysAgo).length;

    const limitedCount = events.filter(e => e.limitedReason !== null).length;
    const limitedPercent = events.length > 0 ? Math.round((limitedCount / events.length) * 100) : 0;

    const composeTimes = events.map(e => e.totalMs).filter(ms => ms > 0);
    const avgComposeTime = composeTimes.length > 0
      ? Math.round(composeTimes.reduce((a, b) => a + b, 0) / composeTimes.length)
      : 0;

    return {
      reports24h,
      reports7d,
      limitedPercent,
      avgComposeTime,
      ok: true,
    };
  } catch {
    return {
      reports24h: 0,
      reports7d: 0,
      limitedPercent: 0,
      avgComposeTime: 0,
      ok: false,
    };
  }
}

// Get provider stats
export function getProviderStats(): ProviderStats[] {
  try {
    const result: ProviderStats[] = [];

    for (const [provider, stats] of providerStats.entries()) {
      const total = stats.success + stats.failure;
      const successRate = total > 0 ? Math.round((stats.success / total) * 100) : 100;
      result.push({
        provider,
        successRate,
        failures: stats.failure,
        lastFailure: stats.lastFailure,
      });
    }

    // Include known providers even if no events yet
    const knownProviders = ['autodev', 'vindata', 'nhtsa'];
    for (const provider of knownProviders) {
      if (!providerStats.has(provider)) {
        result.push({
          provider,
          successRate: 100,
          failures: 0,
          lastFailure: null,
        });
      }
    }

    return result.sort((a, b) => a.provider.localeCompare(b.provider));
  } catch {
    return [];
  }
}

// Get all data (for API)
export function getAllData(limit: number = 50): { events: CommandEvent[]; stats: CommandStats } {
  try {
    return {
      events: getEvents(limit),
      stats: getStats(),
    };
  } catch {
    return {
      events: [],
      stats: { reports24h: 0, reports7d: 0, limitedPercent: 0, avgComposeTime: 0, ok: false },
    };
  }
}

// Seed sample events (dev only)
export function seedSampleEvents(count: number = 50): CommandEvent[] {
  const sampleVins = [
    '1HGCM82633A123456',
    'WBA3A5G50ENP12345',
    '5YJ3E1EA7PF000001',
    '1FTFW1ET5DFC00001',
    'JH4KA3140HC000001',
    '3FAHP0HA8CR000001',
    '2T1BURHE8FC000001',
    '1N4AL3AP6FN000001',
    'JM1BL1H81A1000001',
    'KNMAT2MV3FP000001',
  ];

  const providers = ['autodev', 'vindata', 'nhtsa'];
  const limitedReasons = [null, 'rate_limit', 'provider_timeout', 'partial_data', null];
  const vehicleLabels = [
    '2020 Honda Accord',
    '2019 BMW 3 Series',
    '2023 Tesla Model 3',
    '2018 Ford F-150',
    '2017 Acura TLX',
    '2015 Ford Fusion',
    '2016 Toyota Corolla',
    '2014 Nissan Altima',
    '2010 Mazda 3',
    '2015 Kia Optima',
  ];

  const seeded: CommandEvent[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const vin = sampleVins[i % sampleVins.length];
    const provider = providers[i % providers.length];
    const limitedReason = limitedReasons[i % limitedReasons.length];
    const providerSuccess = limitedReason === null || Math.random() > 0.3;
    const createdAt = new Date(now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString();

    const event = logEvent({
      reportId: `rep-${generateId()}`,
      vin,
      vehicleLabel: vehicleLabels[i % vehicleLabels.length],
      confidence: Math.floor(Math.random() * 30) + 70,
      limitedReason,
      requestId: `req-${generateId()}`,
      provider,
      providerSuccess,
      totalMs: Math.floor(Math.random() * 2000) + 200,
      createdAt,
    });

    seeded.push(event);
  }

  return seeded;
}

// Best-effort persistence to /tmp
async function persistEvents(): Promise<void> {
  if (typeof process === 'undefined') return;
  
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const tmpDir = process.env.TMPDIR || process.env.TEMP || '/tmp';
    const filePath = path.join(tmpDir, 'command-center-events.json');
    
    const data = JSON.stringify({ events, providerStats: Array.from(providerStats.entries()) });
    await fs.writeFile(filePath, data, 'utf-8');
  } catch {
    // Silent fail - persistence is best-effort only
  }
}

// Load from persistence (call on startup)
export async function loadPersistedEvents(): Promise<void> {
  if (typeof process === 'undefined') return;
  
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const tmpDir = process.env.TMPDIR || process.env.TEMP || '/tmp';
    const filePath = path.join(tmpDir, 'command-center-events.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    
    if (parsed.events && Array.isArray(parsed.events)) {
      events.length = 0;
      events.push(...parsed.events.slice(0, MAX_EVENTS));
    }
    
    if (parsed.providerStats && Array.isArray(parsed.providerStats)) {
      providerStats.clear();
      for (const [key, value] of parsed.providerStats) {
        providerStats.set(key, value);
      }
    }
  } catch {
    // Silent fail - no persisted data or failed to load
  }
}
