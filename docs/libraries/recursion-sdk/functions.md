---
description: Available functions in the HCS-3 Recursion SDK.
sidebar_position: 3
---

# Available Functions

The HCS-3 Recursion SDK provides a variety of functions for handling different types of content. Here's a comprehensive guide to the available functions:

## Configuration

### HTML Configuration
You can configure the SDK using HTML data attributes:

<script
  data-hcs-config
  data-hcs-cdn-url="https://your-cdn-url/"
  data-hcs-network="mainnet"
  data-hcs-retry-attempts="3"
  data-hcs-retry-backoff="300"
  data-hcs-debug="true"
  data-hcs-show-loading-indicator="true"
></script>

## Loading Resources

### Scripts
```html
<script data-src="hcs://1/0.0.12345" data-script-id="unique-id"></script>
```

### Stylesheets
```html
<link data-src="hcs://1/0.0.12345" data-script-id="unique-id" rel="stylesheet">
```

### Images
```html
<img data-src="hcs://1/0.0.12345" alt="Description">
```

### Video
```html
<video data-src="hcs://1/0.0.12345" controls></video>
```

### Audio
```html
<audio data-src="hcs://1/0.0.12345" controls></audio>
```

### 3D Models (GLB)
```html
<model-viewer data-src="hcs://1/0.0.12345" camera-controls auto-rotate ar></model-viewer>
```

## Audio Functions

### Preload Audio
```javascript
await HCS.preloadAudio('0.0.12345');
```

### Play Audio
```javascript
await HCS.playAudio('0.0.12345', 0.5);
```

### Pause Audio
```javascript
await HCS.pauseAudio('0.0.12345');
```

### Load and Play Audio
```javascript
await HCS.loadAndPlayAudio('0.0.12345', true, 0.8);
```

## Image Functions

### Preload Image
```javascript
const imageUrl = await HCS.preloadImage('0.0.12345');
```

## Loading Order

You can control the loading order of resources using the data-load-order attribute:

```html
<script data-src="hcs://1/0.0.12345" data-load-order="1"></script>
<script data-src="hcs://1/0.0.12346" data-load-order="2"></script>
```

## Event Handling

### Ready Event
```javascript
window.HCSReady = function() {
    console.log('All HCS resources have been loaded');
};
```

### Loading Status Callback
```javascript
window.onHCSLoading = function(id, status) {
    console.log(`Resource ${id} status: ${status}`);
};
```

## Additional Examples

For more examples and use cases, visit our [GitHub repository](https://github.com/hashgraph-online/hcs-recursion-sdk/tree/main/examples).

## Error Handling

The SDK includes built-in retry logic for failed requests:
- Default retry attempts: 3
- Default backoff: 300ms (doubles after each retry)
- Required resources will throw errors if they fail to load
- Optional resources will log errors but continue loading other resources

You can customize these settings using the configuration options shown above.