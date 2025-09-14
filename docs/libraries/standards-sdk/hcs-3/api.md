---
title: HCS‑3 API Reference
description: Vanilla reference for HCS‑3 content loader/resolver in the Standards SDK.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-3
- index.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-3/index.ts
- src/: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-3/src

## Import Paths

```ts
import { HCS as HCS3 } from '@hashgraphonline/standards-sdk/hcs-3';
import type { HCSConfig, HCSConfigMapping, LoadQueueItem, LoadType } from '@hashgraphonline/standards-sdk/hcs-3/src/types';
```

## Types

```ts
type LoadType = 'script' | 'image' | 'video' | 'audio' | 'glb' | 'css';

interface HCSConfig {
  cdnUrl: string;             // default 'https://kiloscribe.com/api/inscription-cdn/'
  network: string;            // 'mainnet' | 'testnet'
  retryAttempts?: number;     // default 3
  retryBackoff?: number;      // default 300ms
  debug?: boolean;            // default false
  showLoadingIndicator?: boolean;
  loadingCallbackName?: string | null; // window[callback](id, status)
}

interface HCSConfigMapping {
  hcsCdnUrl: 'cdnUrl';
  hcsNetwork: 'network';
  hcsRetryAttempts: 'retryAttempts';
  hcsRetryBackoff: 'retryBackoff';
  hcsDebug: 'debug';
  hcsShowLoadingIndicator: 'showLoadingIndicator';
  hcsLoadingCallbackName: 'loadingCallbackName';
}
```

## Class: HCS3

```ts
constructor();

// Logging
log(...args: any[]): void;
error(...args: any[]): void;

// Config
loadConfigFromHTML(): void;        // reads <script data-hcs-config .../>
sleep(ms: number): Promise<void>;

// Duplicate detection
isDuplicate(topicId: string): boolean;

// CDN fetch with retries
fetchWithRetry(url: string, retries?: number, backoff?: number): Promise<Response>;

// Hedera Reference Link (HRL) data
retrieveHCS1Data(topicId: string, cdnUrl?: string, network?: string): Promise<Blob>;

// Loaders (dom‑oriented)
loadScript(el: HTMLElement): Promise<void>;
loadImage(el: HTMLElement): Promise<void>;
loadVideo(el: HTMLElement): Promise<void>;
loadAudio(el: HTMLElement): Promise<void>;
loadGLB(el: HTMLElement): Promise<void>;

// Queue (batch loading)
enqueue(item: LoadQueueItem): void;
processQueue(): Promise<void>;
```

Notes
- Internally tracks loaded resources (scripts/wasm/images/videos/audios/glbs) and emits `HCSScriptLoaded` events.
- For legacy pages, the loader can display simple console indicators or call a window callback.

## Examples

```ts
const h = new HCS3();
h.loadConfigFromHTML(); // reads defaults from DOM
const blob = await h.retrieveHCS1Data('0.0.123', h.config.cdnUrl, h.config.network);
```
