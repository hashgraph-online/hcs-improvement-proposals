---
sidebar_position: 4
---

# Rendering Implementation

The HCS-12 rendering system in the Standards SDK handles template processing and block composition with context injection for attributes, actions, and results.

---

## What It Does

- **Processes templates** with Handlebars-style syntax and XSS protection
- **Injects context** including attributes, actions, and results
- **Handles action binding** through data attributes in HTML
- **Manages nested block composition** through template references
- **Loads external resources** with security validation

---

## Template Engine

The SDK includes a Handlebars-compatible template engine with XSS protection:

```typescript
import { TemplateEngine } from '@hashgraphonline/standards-sdk';

// Create template engine
const templateEngine = new TemplateEngine(logger);

// Render a template with context
const html = await templateEngine.render(templateString, {
  attributes: {
    title: 'My Block',
    count: 42
  },
  actions: {
    increment: '0.0.123456',
    decrement: '0.0.123456'
  },
  actionResults: {
    increment: {
      success: true,
      data: { newValue: 43 }
    }
  }
});
```

---

## Template Syntax

Templates use Handlebars-style syntax with additional HashLinks features:

```html
<!-- Variable substitution -->
<h1>{{attributes.title}}</h1>
<p>Count: {{attributes.count}}</p>

<!-- Conditional rendering -->
{{#if attributes.showDetails}}
  <div class="details">Detailed information</div>
{{/if}}

{{#unless attributes.hideControls}}
  <div class="controls">Control elements</div>
{{/unless}}

<!-- Looping through arrays -->
<ul>
  {{#each attributes.items}}
    <li>{{this.name}}: {{this.value}}</li>
  {{/each}}
</ul>

<!-- Action binding -->
<button 
  data-action-click="{{actions.increment}}" 
  data-params='{"step": {{attributes.step}}}'>
  Increment
</button>
```

---

## Block Renderer

The block renderer handles complete block rendering with context injection:

```typescript
import { BlockRenderer } from '@hashgraphonline/standards-sdk';

// Create block renderer
const blockRenderer = new BlockRenderer(
  logger,
  gutenbergBridge,
  templateEngine,
  stateManager
);

// Render a block
const result = await blockRenderer.render(blockDefinition, {
  attributes: {
    count: 5,
    step: 1,
    label: 'Counter'
  },
  actions: {
    increment: '0.0.123456',
    decrement: '0.0.123456'
  },
  container: '#block-container'
});
```

---

## Context Injection

The rendering system injects various contexts into templates:

```typescript
interface TemplateContext {
  attributes?: Record<string, any>;
  actions?: Record<string, string>;
  actionResults?: Record<string, any>;
  actionErrors?: Record<string, any>;
  blockId: string;
  network: 'mainnet' | 'testnet';
}
```

---

## Action Binding

Templates support various action binding mechanisms:

```html
<!-- Click actions -->
<button data-action-click="{{actions.submit}}">Submit</button>

<!-- Change actions -->
<select data-action-change="{{actions.update}}">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>

<!-- Form submission -->
<form data-action="{{actions.process}}" data-validate="{{actions.validate}}">
  <input type="text" name="username" />
  <button type="submit">Process</button>
</form>

<!-- Mouse events -->
<div data-action-mouseover="{{actions.preview}}" 
     data-action-mouseout="{{actions.hidePreview}}">
  Hover for preview
</div>
```

---

## Parameter Passing

Actions can receive parameters in various ways:

```html
<!-- Static parameters -->
<button data-action-click="{{actions.transfer}}" 
        data-params='{"amount": 100, "token": "HBAR"}'>
  Transfer 100 HBAR
</button>

<!-- Dynamic parameters from attributes -->
<button data-action-click="{{actions.transfer}}" 
        data-params='{"tokenId": "{{attributes.tokenId}}"}'>
  Transfer {{attributes.tokenName}}
</button>

<!-- Form data parameters -->
<form data-action="{{actions.submit}}">
  <input name="recipient" type="text" value="{{attributes.defaultRecipient}}" />
  <input name="amount" type="number" value="{{attributes.defaultAmount}}" />
  <button type="submit">Send</button>
</form>
```

---

## Nested Block Rendering

The renderer supports nested block composition:

```html
<!-- Parent block template -->
<div class="container-block" data-block-id="{{blockId}}">
  <h2>{{attributes.title}}</h2>
  
  <!-- Nested blocks -->
  {{#each attributes.childBlocks}}
    <div data-hashlink="hcs://12/{{this.blockId}}"
         data-attributes='{"parentId": "{{blockId}}"}'>
    </div>
  {{/each}}
  
  <!-- Conditional nested blocks -->
  {{#if attributes.showCounter}}
    <div data-hashlink="hcs://12/{{attributes.counterBlockId}}"
         data-actions='{"increment": "{{actions.increment}}"}'>
    </div>
  {{/if}}
</div>
```

---

## Resource Management

The renderer handles external resource loading:

```html
<!-- CSS resources -->
<link rel="stylesheet" 
      data-src="hcs://1/0.0.123456" 
      data-script-id="block-styles" />

<!-- JavaScript resources -->
<script data-src="hcs://3/0.0.789012" 
        data-dependencies="['jquery', 'react']">
</script>

<!-- Image resources -->
<img data-src="hcs://1/{{attributes.imageTopicId}}" 
     alt="{{attributes.imageAlt}}" 
     loading="lazy" />
```

---

## State Management

The rendering system manages block state:

```typescript
import { BlockStateManager } from '@hashgraphonline/standards-sdk';

// Create state manager
const stateManager = new BlockStateManager();

// Set block state
stateManager.setBlockState('0.0.123456', {
  attributes: {
    count: 5,
    step: 1
  },
  actionResults: {
    increment: {
      success: true,
      data: { newValue: 6 }
    }
  }
});

// Get block state
const state = stateManager.getBlockState('0.0.123456');
```

---

## Security Features

The renderer includes built-in security features:

```typescript
// XSS protection
const sanitizedHtml = templateEngine.sanitizeHtml(unsafeHtml);

// Script tag removal
const cleanHtml = templateEngine.removeScriptTags(htmlWithScripts);

// Attribute validation
const isValid = templateEngine.validateAttributes(attributes);
```

---

## Custom Helpers

The template engine supports custom helper functions:

```typescript
// Register custom helper
templateEngine.registerHelper('formatCurrency', (amount, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount);
});

// Use in template
<span>{{formatCurrency attributes.amount "USD"}}</span>
```

---

## Performance Optimization

The renderer includes performance optimizations:

```typescript
// Template caching
templateEngine.clearCache(); // Clear cache when needed
const cacheSize = templateEngine.getCacheSize(); // Monitor cache size

// Precompilation
await templateEngine.precompile('counter-template', templateHtml);
const html = await templateEngine.renderCompiled('counter-template', context);

// Batch rendering
const results = await Promise.all([
  blockRenderer.render(block1, options1),
  blockRenderer.render(block2, options2),
  blockRenderer.render(block3, options3)
]);
```

---

## Browser Integration

The renderer works seamlessly in browser environments:

```typescript
// Browser-specific rendering
const result = await blockRenderer.render(blockDefinition, {
  container: document.getElementById('block-container'),
  theme: 'dark',
  responsive: true
});

// DOM manipulation
if (result.element) {
  document.getElementById('container').appendChild(result.element);
}

// Cleanup
if (result.cleanup) {
  result.cleanup();
}
```

---

## Error Handling

The renderer provides comprehensive error handling:

```typescript
try {
  const result = await blockRenderer.render(blockDefinition, renderOptions);
  
  if (result.html) {
    document.getElementById('container').innerHTML = result.html;
  }
} catch (error) {
  console.error('Rendering failed:', error.message);
  
  // Show error UI
  document.getElementById('container').innerHTML = `
    <div class="error-message">
      Failed to render block: ${error.message}
    </div>
  `;
}
```

---

## Best Practices

- **Template Security**: Always sanitize templates to prevent XSS
- **Performance**: Use caching and precompilation for frequently rendered templates
- **Error Handling**: Handle rendering errors gracefully with user-friendly messages
- **Resource Management**: Load external resources efficiently
- **State Management**: Properly manage and update block state
- **Accessibility**: Ensure rendered content is accessible
- **Responsive Design**: Make templates responsive to different screen sizes
- **Testing**: Test templates with various data scenarios