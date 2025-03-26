---
sidebar_position: 2
---

# HCS-3: Recursion for Inscribed Files

The HCS-3 module provides a powerful toolkit for working with recursive inscribed files on the Hedera network. It enables loading and manipulating content directly from inscription references, creating a seamless experience for content-heavy applications.

## Key Concepts

HCS-3 introduces the concept of recursive content loading, which allows:

- **Content URI Scheme**: Using the `hcs://` protocol for referencing inscribed content
- **Automatic Recursion**: Loading nested content references automatically
- **Cross-Origin Loading**: Accessing content across different origins securely
- **Environment Adaptability**: Working in both Node.js and browser environments

## Getting Started

### Installation

The HCS-3 module is included in the Standards SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Usage

Import the HCS3 module and create an instance:

```typescript
import { HCS3 } from '@hashgraphonline/standards-sdk';

// Initialize HCS-3 with configuration
const hcs = new HCS3.HCS({
  cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/',
  network: 'mainnet',
  retryAttempts: 3,
  retryBackoff: 300,
  debug: false,
});
```

## Loading Different Content Types

HCS-3 provides specialized methods for loading different types of content:

### Loading Scripts

```typescript
// Load and execute a JavaScript file from an inscription
await hcs.loadScript('hcs://1/0.0.123456');
```

### Loading Images

```typescript
// Load an image from an inscription and insert it into a DOM element
const imageElement = document.getElementById('myImage');
await hcs.loadImage('hcs://1/0.0.123456', imageElement);
```

### Loading Video

```typescript
// Load a video from an inscription and insert it into a DOM element
const videoElement = document.getElementById('myVideo');
await hcs.loadVideo('hcs://1/0.0.123456', videoElement);
```

### Loading Audio

```typescript
// Load audio from an inscription and insert it into a DOM element
const audioElement = document.getElementById('myAudio');
await hcs.loadAudio('hcs://1/0.0.123456', audioElement);
```

### Loading 3D Models (GLB)

```typescript
// Load a 3D model from an inscription and insert it into a model-viewer element
const modelElement = document.getElementById('myModel');
await hcs.loadGLB('hcs://1/0.0.123456', modelElement);
```

## Advanced Usage

### Custom Content Loaders

You can create custom content loaders for specific content types:

```typescript
// Create a custom loader for SVG files
hcs.registerContentLoader('svg', async (content, targetElement) => {
  if (targetElement) {
    targetElement.innerHTML = content;
  }
  return content;
});

// Use the custom loader
await hcs.loadContent('hcs://1/0.0.123456', 'svg', svgContainer);
```

### Content Pre-loading

Pre-load content for faster access:

```typescript
// Preload multiple resources
await Promise.all([
  hcs.preloadContent('hcs://1/0.0.123456'),
  hcs.preloadContent('hcs://1/0.0.789012'),
  hcs.preloadContent('hcs://1/0.0.345678'),
]);
```

### Error Handling

Implement robust error handling for content loading:

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

### HCS Class

The main class for working with HCS-3 recursion.

#### Constructor

```typescript
constructor(config: {
  cdnUrl: string;
  network: 'mainnet' | 'testnet';
  retryAttempts?: number;
  retryBackoff?: number;
  debug?: boolean;
})
```

#### Methods

| Method                                                                                  | Description                          |
| --------------------------------------------------------------------------------------- | ------------------------------------ |
| `loadScript(uri: string): Promise<void>`                                                | Loads and executes a JavaScript file |
| `loadImage(uri: string, element?: HTMLImageElement): Promise<string>`                   | Loads an image file                  |
| `loadVideo(uri: string, element?: HTMLVideoElement): Promise<string>`                   | Loads a video file                   |
| `loadAudio(uri: string, element?: HTMLAudioElement): Promise<string>`                   | Loads an audio file                  |
| `loadGLB(uri: string, element?: HTMLElement): Promise<string>`                          | Loads a 3D model file                |
| `loadContent(uri: string, contentType: string, element?: HTMLElement): Promise<string>` | Generic content loader               |
| `preloadContent(uri: string): Promise<string>`                                          | Pre-loads content without rendering  |
| `registerContentLoader(contentType: string, loader: ContentLoaderFn): void`             | Registers a custom content loader    |

## Examples

### Web Application With HCS-3 Resources

```typescript
import { HCS3 } from '@hashgraphonline/standards-sdk';

// Initialize HCS-3
const hcs = new HCS3.HCS({
  cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/',
  network: 'mainnet',
});

// Application initialization
async function initApp() {
  // Load application banner image
  await hcs.loadImage('hcs://1/0.0.123456', document.getElementById('banner'));

  // Load styling
  await hcs.loadStylesheet('hcs://1/0.0.234567');

  // Load application logic
  await hcs.loadScript('hcs://1/0.0.345678');

  // Load 3D product model
  await hcs.loadGLB(
    'hcs://1/0.0.456789',
    document.getElementById('productModel')
  );

  console.log('Application resources loaded successfully');
}

// Start loading
initApp().catch(console.error);
```

## Browser Compatibility

HCS-3 is compatible with all modern browsers, including:

- Chrome (version 80+)
- Firefox (version 75+)
- Safari (version 13.1+)
- Edge (version 80+)

For older browsers, consider using a polyfill for Promise and fetch API support.
