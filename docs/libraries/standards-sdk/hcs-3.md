---
sidebar_position: 2
---

# HCS-3: Resource Recursion

The HCS-3 module enables applications to reference and load resources directly from the Hedera Hashgraph. It provides a seamless way to work with inscribed content through URI references, creating powerful composable applications.

## What HCS-3 Does

- **Resolves Resource References** - Loads content directly from `hcs://` URIs
- **Handles Recursive Content** - Automatically processes nested references
- **Simplifies Media Integration** - Specialized functions for different content types

## Getting Started

### Installation

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Setup

```typescript
import { HCS3 } from '@hashgraphonline/standards-sdk';

// Initialize the HCS-3 client
const hcs = new HCS3.HCS({
  cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/',
  network: 'mainnet',
  retryAttempts: 3,
  retryBackoff: 300,
  debug: false,
});
```

## Loading Content

### Images

Load images directly from inscriptions:

```typescript
// Get an image reference
const imageElement = document.getElementById('myImage');

// Load the image from an inscription
await hcs.loadImage('hcs://1/0.0.123456', imageElement);
```

### Scripts

Execute JavaScript files from inscriptions:

```typescript
// Load and execute a script
await hcs.loadScript('hcs://1/0.0.123456');

// Now any functions or variables defined in that script are available
myInscribedFunction();
```

### Media Files

Easily work with various media types:

```typescript
// Load a video
const videoElement = document.getElementById('myVideo');
await hcs.loadVideo('hcs://1/0.0.123456', videoElement);

// Load audio
const audioElement = document.getElementById('myAudio');
await hcs.loadAudio('hcs://1/0.0.123456', audioElement);

// Load a 3D model (GLB format)
const modelElement = document.getElementById('myModel');
await hcs.loadGLB('hcs://1/0.0.123456', modelElement);
```

## Advanced Features

### Custom Content Loaders

Create specialized loaders for specific content types:

```typescript
// Register a custom SVG loader
hcs.registerContentLoader('svg', async (content, targetElement) => {
  if (targetElement) {
    targetElement.innerHTML = content;
  }
  return content;
});

// Use your custom loader
const svgContainer = document.getElementById('mySvg');
await hcs.loadContent('hcs://1/0.0.123456', 'svg', svgContainer);
```

### Content Preloading

Improve performance by preloading resources:

```typescript
// Preload multiple resources in parallel
await Promise.all([
  hcs.preloadContent('hcs://1/0.0.123456'),
  hcs.preloadContent('hcs://1/0.0.789012'),
  hcs.preloadContent('hcs://1/0.0.345678'),
]);

// The content is now cached and will load instantly when needed
await hcs.loadImage('hcs://1/0.0.123456', imageElement);
```

### Error Handling

Implement robust error handling:

```typescript
try {
  await hcs.loadImage('hcs://1/0.0.123456', imageElement);
} catch (error) {
  console.error('Failed to load image:', error);

  // Display fallback content
  imageElement.src = 'fallback-image.png';
  imageElement.alt = 'Content unavailable';
}
```

## API Reference

### HCS Class Configuration

```typescript
type HCSConfig = {
  cdnUrl: string; // CDN URL for faster content loading
  network: 'mainnet' | 'testnet'; // Hedera Hashgraph to use
  retryAttempts?: number; // Number of retry attempts (default: 3)
  retryBackoff?: number; // Milliseconds between retries (default: 300)
  debug?: boolean; // Enable debug logging (default: false)
};
```

### Core Methods

| Method                  | Description                          | Parameters                                                |
| ----------------------- | ------------------------------------ | --------------------------------------------------------- |
| `loadScript`            | Loads and executes a JavaScript file | `uri: string`                                             |
| `loadImage`             | Loads an image from an inscription   | `uri: string, element?: HTMLImageElement`                 |
| `loadVideo`             | Loads a video from an inscription    | `uri: string, element?: HTMLVideoElement`                 |
| `loadAudio`             | Loads audio from an inscription      | `uri: string, element?: HTMLAudioElement`                 |
| `loadGLB`               | Loads a 3D model from an inscription | `uri: string, element?: HTMLElement`                      |
| `loadContent`           | Generic content loader               | `uri: string, contentType: string, element?: HTMLElement` |
| `preloadContent`        | Pre-loads content without rendering  | `uri: string`                                             |
| `registerContentLoader` | Registers a custom content loader    | `contentType: string, loader: ContentLoaderFn`            |

## Example Application

Here's how to build a complete web application using HCS-3 resources:

```typescript
import { HCS3 } from '@hashgraphonline/standards-sdk';

// Initialize HCS-3
const hcs = new HCS3.HCS({
  cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/',
  network: 'mainnet',
});

// Application initialization
async function initApp() {
  try {
    // Load application assets in parallel
    await Promise.all([
      // Banner image
      hcs.loadImage('hcs://1/0.0.123456', document.getElementById('banner')),

      // Application styling
      hcs.loadStylesheet('hcs://1/0.0.234567'),

      // 3D product model
      hcs.loadGLB(
        'hcs://1/0.0.456789',
        document.getElementById('productModel')
      ),
    ]);

    // Load application logic last (depends on UI elements)
    await hcs.loadScript('hcs://1/0.0.345678');

    console.log('Application ready!');
    showUserInterface();
  } catch (error) {
    console.error('Failed to initialize:', error);
    showErrorScreen();
  }
}

// Start the application
initApp();
```

## Browser Support

The HCS-3 module works in all modern browsers:

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

For older browsers, consider using polyfills for Promise and Fetch API support.
