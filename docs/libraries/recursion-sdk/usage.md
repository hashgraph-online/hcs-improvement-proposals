---
description: Learn how to use the HCS-3 Recursion SDK to load resources from the Hedera Hashgraph.
sidebar_position: 2
---

# Basic Usage

Let's build a simple 3D scene using ThreeJS loaded through HCS-3 recursion.

## Step 1: Create Basic HTML Structure

> **Note**: Before proceeding, you'll need to include the latest HCS-3 Recursion SDK.
>
> 1. Visit the [HCS Recursion SDK repository](https://github.com/hashgraph-online/hcs-recursion-sdk/blob/main/dist/hcs-recursion-sdk.js)
> 2. Copy the contents of `hcs-recursion-sdk.js` into a script tag:
>
> ```html
> <script id="hcs-sdk">
>   // Paste the copied SDK code here
> </script>
> ```
>
> 3. Add it to your HTML file before any other HCS-3 related scripts using a script tag:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ThreeJS with HCS-3</title>
    <style>
      body {
        margin: 0;
      }
      canvas {
        display: block;
      }
    </style>

    <!-- Configure HCS-3 -->
    <script
      data-hcs-config
      data-hcs-cdn-url="https://kiloscribe.com/api/inscription-cdn/"
      data-hcs-network="mainnet"
      data-hcs-debug="true"
      data-hcs-retry-attempts="5"
      data-hcs-retry-backoff="500"
      data-hcs-show-loading-indicator="true"
      data-hcs-loading-callback-name="setLoadingIndicator"
    ></script>

    <!-- Load Dependencies -->
    <script
      data-src="hcs://1/0.0.6614307"
      data-script-id="threejs"
      data-load-order="1"
    ></script>
    <script
      data-src="hcs://1/0.0.6627067"
      data-script-id="animejs"
      data-load-order="2"
    ></script>
  </head>
  <body>
    <canvas id="canvas"></canvas>
    <div id="loading"></div>

    <!-- Paste the copied SDK code here -->
    <script id="hcs-sdk">
      // Paste the copied SDK code here
    </script>
    <script>
      // Loading indicator
      window.setLoadingIndicator = function (id, status) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `Loading ${id}: ${status}`;
        if (status === 'loaded' && id === 'animejs') {
          setTimeout(() => {
            loading.style.display = 'none';
          }, 1000);
        }
      };

      // Main application
      window.HCSReady = async function () {};
    </script>
  </body>
</html>
```

## Step 2: Add Required Scripts

Add ThreeJS and other dependencies using HCS-3 recursion. Note the `data-load-order` to ensure proper loading sequence:

```html
<!-- Load ThreeJS from HCS -->
<script
  data-src="hcs://1/0.0.6614307"
  data-script-id="threejs"
  data-load-order="1"
></script>

<!-- Optional: Load AnimeJS for animations -->
<script
  data-src="hcs://1/0.0.6627067"
  data-script-id="animejs"
  data-load-order="2"
></script>
```

## Step 3: Add Loading Indicator

```html
<script>
  window.setLoadingIndicator = function (id, status) {
    const loading = document.getElementById('loading');
    loading.innerHTML = `Loading ${id}: ${status}`;
  };
</script>
```

## Step 4: Initialize ThreeJS Scene

Add the main application code that will run after all resources are loaded:

```html
<script>
  window.HCSReady = async function () {
    // Setup ThreeJS
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };
</script>
```

## Step 5: Add Textures (Optional)

To load and apply textures from HCS:

```javascript
// Inside HCSReady function
const textureUrl = await window.HCS.preloadImage('0.0.4840659'); // Your texture topic ID
const texture = new THREE.TextureLoader().load(textureUrl);
const material = new THREE.MeshBasicMaterial({ map: texture });
```

## Putting It All Together

Now, let's put it all together:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ThreeJS with HCS-3</title>
    <style>
      body {
        margin: 0;
      }
      canvas {
        display: block;
      }
      #loading {
        position: fixed;
        top: 20px;
        left: 20px;
        color: white;
        font-family: Arial, sans-serif;
        background: rgba(0, 0, 0, 0.7);
        padding: 10px;
        border-radius: 5px;
      }
    </style>

    <!-- Configure HCS-3 -->
    <script
      data-hcs-config
      data-hcs-cdn-url="https://kiloscribe.com/api/inscription-cdn/"
      data-hcs-network="mainnet"
      data-hcs-debug="true"
      data-hcs-retry-attempts="5"
      data-hcs-retry-backoff="500"
      data-hcs-show-loading-indicator="true"
      data-hcs-loading-callback-name="setLoadingIndicator"
    ></script>

    <!-- Load Dependencies -->
    <script
      data-src="hcs://1/0.0.6614307"
      data-script-id="threejs"
      data-load-order="1"
    ></script>
    <script
      data-src="hcs://1/0.0.6627067"
      data-script-id="animejs"
      data-load-order="2"
    ></script>

    <!-- Paste the copied SDK code here -->
    <script>
      // Paste the copied SDK code here
    </script>
  </head>
  <body>
    <canvas id="canvas"></canvas>
    <div id="loading"></div>

    <script>
      // Loading indicator
      window.setLoadingIndicator = function (id, status) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `Loading ${id}: ${status}`;
        if (status === 'loaded' && id === 'animejs') {
          setTimeout(() => {
            loading.style.display = 'none';
          }, 1000);
        }
      };

      // Main application
      window.HCSReady = async function () {
        // Setup scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('canvas'),
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000033);

        // Load texture from HCS
        const textureUrl = await window.HCS.preloadImage('0.0.4840659');
        const texture = new THREE.TextureLoader().load(textureUrl);

        // Create textured cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Add animation with AnimeJS
        anime({
          targets: cube.rotation,
          y: Math.PI * 2,
          duration: 4000,
          easing: 'linear',
          loop: true,
        });

        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          renderer.render(scene, camera);
        }
        animate();

        // Handle window resizing
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      };
    </script>
  </body>
</html>
```

## Key Points

1. The HCS-3 Recursion SDK is automatically injected when utilizing the KiloScribe CDN. This ensures you always have the latest version.
2. Resources are loaded in order specified by `data-load-order`
3. All initialization code goes inside the `HCSReady` callback
4. The Recursion SDK ships with helper functions for common tasks like loading textures and GLBs.
5. Topic IDs (like `0.0.6614307`) are real HCS-1 inscribed resources
