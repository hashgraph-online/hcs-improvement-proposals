---
sidebar_position: 2
---

# Blocks Implementation

Blocks in HCS-12 are UI components based on the WordPress Gutenberg block standard. The Standards SDK provides comprehensive support for creating, registering, and rendering blocks.

---

## What It Does

- **Creates Gutenberg-compatible blocks** with separate definition and template storage
- **Manages block attributes** with default values and validation
- **Handles template rendering** with Handlebars-style placeholders
- **Supports action binding** through topic ID references
- **Enables nested composition** through template-based references

---

## Block Structure

Blocks consist of two parts stored separately via HCS-1:

1. **Block Definition**: JSON metadata following Gutenberg standards
2. **Block Template**: HTML template with Handlebars-style placeholders

```typescript
interface BlockDefinition {
  apiVersion: number;           // API version (default: 3)
  name: string;                 // Block name (e.g., 'hashlink/counter')
  title: string;                // Display title
  category: string;             // Block category
  icon?: string | BlockIcon;    // Dashicon name or custom icon
  description?: string;         // Block description
  keywords?: string[];          // Search keywords
  attributes: Record<string, AttributeDefinition>;
  supports: BlockSupports;      // Feature support flags
  template_t_id: string;        // Template topic ID (HCS-1)
}
```

---

## Using BlockBuilder

The SDK provides a `BlockBuilder` for creating block definitions:

```typescript
import { BlockBuilder } from '@hashgraphonline/standards-sdk';

// Create a simple display block
const displayBlock = BlockBuilder.createDisplayBlock(
  'hashlink/stats-display',
  'Statistics Display'
)
  .setDescription('Display statistics and metrics')
  .setIcon('chart-bar')
  .setKeywords(['stats', 'metrics', 'data'])
  .addAttribute('title', 'string', 'Statistics')
  .addAttribute('values', 'array', [])
  .addSupport('align', ['wide', 'full'])
  .addSupport('anchor', true)
  .setTemplateTopicId('0.0.123456')  // Must set template topic ID
  .build();

// Create an interactive block with template
const interactiveBlock = new BlockBuilder()
  .setName('hashlink/counter')
  .setTitle('Counter Block')
  .setDescription('Interactive counter with increment/decrement/reset')
  .setCategory('widgets')  // Note: 'widgets' for interactive blocks
  .setIcon('calculator')
  .addAttribute('count', 'number', 0)
  .addAttribute('step', 'number', 1)
  .addAttribute('label', 'string', 'Counter')
  .setTemplate(Buffer.from(templateHtml))  // Set template buffer
  .enableCommonSupports()
  .build();
```

---

## Block Attributes

Blocks support various attribute types with default values:

```typescript
// String attribute
blockBuilder.addAttribute('title', 'string', 'Default Title');

// Number attribute
blockBuilder.addAttribute('count', 'number', 0);

// Boolean attribute
blockBuilder.addAttribute('enabled', 'boolean', true);

// Array attribute
blockBuilder.addAttribute('items', 'array', []);

// Object attribute
blockBuilder.addAttribute('config', 'object', {
  theme: 'light',
  size: 'medium',
});

// Enum attribute with options
blockBuilder.addAttribute('theme', 'string', 'light', {
  enum: ['light', 'dark', 'auto'],
});

// Attribute with source mapping (for Gutenberg)
blockBuilder.addAttribute('content', 'string', '', {
  source: 'html',
  selector: '.content',
});

// Attribute with custom selector
blockBuilder.addAttribute('imageUrl', 'string', '', {
  source: 'attribute',
  selector: 'img',
  attribute: 'src',
});
```

---

## Block Templates

Block templates use Handlebars-style placeholders and support action binding:

```html
<!-- counter-block-template.html -->
<div class="hashlink-block counter-block" data-block-id="\{\{blockId\}\}">
  <h3>\{\{attributes.label\}\}</h3>

  <div class="counter-display">
    Count: <span class="count-value">\{\{attributes.count\}\}</span>
  </div>

  <div class="counter-controls">
    <button
      data-action-click="\{\{actions.decrement\}\}"
      data-params='{"step": \{\{attributes.step\}\}}'
    >
      -
    </button>

    <button
      data-action-click="\{\{actions.increment\}\}"
      data-params='{"step": \{\{attributes.step\}\}}'
    >
      +
    </button>

    <button data-action-click="\{\{actions.reset\}\}">Reset</button>
  </div>

  \{\{#if actionResults.increment\}\}
  <div class="success-message">Incremented successfully!</div>
  \{\{/if\}\} \{\{#if actionErrors.decrement\}\}
  <div class="error-message">\{\{actionErrors.decrement.message\}\}</div>
  \{\{/if\}\}
</div>
```

---

## Action Binding

Blocks can bind to actions in two ways:

### 1. During Block Creation

```typescript
// Add action mappings during block building
const blockWithActions = new BlockBuilder()
  .setName('hashlink/counter')
  .setTitle('Counter')
  .setCategory('widgets')
  .addAttribute('count', 'number', 0)
  .addAction('increment', '0.0.123456')  // Action name -> topic ID
  .addAction('decrement', '0.0.123456')
  .addAction('reset', '0.0.123456')
  .setTemplate(templateBuffer)
  .build();

// Or set all actions at once
blockBuilder.setActions({
  increment: '0.0.123456',
  decrement: '0.0.123456',
  reset: '0.0.123456',
});
```

### 2. During Assembly Composition

```typescript
// Map actions when adding block to assembly
const assemblyBuilder = new AssemblyBuilder(logger)
  .addBlock(blockTopicId, {
    attributes: {
      count: 0,
      step: 1,
      label: 'My Counter',
    },
    actions: {
      increment: '0.0.123456',  // Override or provide action mappings
      decrement: '0.0.123456',
      reset: '0.0.123456',
    },
  });
```

---

## Nested Blocks

Blocks support template-based composition through nested references:

```html
<!-- container-block-template.html -->
<div class="hashlink-container" data-block-id="\{\{blockId\}\}">
  <h2>\{\{attributes.title\}\}</h2>

  \{\{#if attributes.showCounter\}\}
  <div
    data-hashlink="hcs://12/\{\{attributes.counterBlockId\}\}"
    data-actions='{"increment": "\{\{actions.increment\}\}"}'
    data-attributes='{"label": "Nested Counter"}'
  ></div>
  \{\{/if\}\} \{\{#if attributes.showStats\}\}
  <div
    data-hashlink="hcs://12/\{\{attributes.statsBlockId\}\}"
    data-attributes='{"title": "Nested Stats"}'
  ></div>
  \{\{/if\}\}
</div>
```

---

## Block Registration

Blocks are registered using the SDK's `registerBlock` method:

```typescript
// Method 1: Register with template buffer
const blockBuilder = new BlockBuilder()
  .setName('hashlink/my-block')
  .setTitle('My Block')
  .setCategory('widgets')
  .setTemplate(Buffer.from(templateHtml));  // Template will be inscribed

// Register block (template is automatically inscribed via HCS-1)
const registeredBuilder = await client.registerBlock(blockBuilder);
const blockTopicId = registeredBuilder.getTopicId();

console.log('Block registered:', blockTopicId);

// Method 2: Register with existing template topic ID
const blockBuilder2 = new BlockBuilder()
  .setName('hashlink/another-block')
  .setTitle('Another Block')
  .setCategory('formatting')
  .setTemplateTopicId('0.0.789012');  // Use existing template

const registered2 = await client.registerBlock(blockBuilder2);
```

---

## Block Rendering

The SDK provides a `BlockRenderer` for displaying blocks:

```typescript
import { BlockRenderer } from '@hashgraphonline/standards-sdk';

// Create renderer instance
const renderer = new BlockRenderer(
  logger,
  client.gutenbergBridge,
  client.templateEngine,
  client.blockStateManager
);

// Render a block
const result = await renderer.render(block, {
  container: document.getElementById('app'),  // Or selector string
  initialState: {
    count: 5,
    step: 2,
    label: 'Demo Counter',
  },
  assembly,           // Optional: assembly context
  actionRegistry,     // Optional: for action execution
  network: NetworkType.TESTNET,
  theme: 'light',     // Optional: 'light' or 'dark'
  responsive: true,   // Optional: enable responsive design
});

// Result contains
console.log(result.element);  // DOM element (if container provided)
console.log(result.html);      // HTML string
console.log(result.cleanup);   // Cleanup function for event listeners
```

---

## Template Engine

The SDK includes a Handlebars-compatible template engine:

```typescript
import { TemplateEngine } from '@hashgraphonline/standards-sdk';

const templateEngine = new TemplateEngine(logger);

// Register custom helpers
templateEngine.registerHelper('formatNumber', (value) => {
  return new Intl.NumberFormat().format(value);
});

templateEngine.registerHelper('uppercase', (str) => {
  return str?.toUpperCase() || '';
});

// Compile and render template
const context = {
  blockId: 'block-123',
  attributes: {
    count: 42,
    label: 'Counter',
  },
  actions: {
    increment: '0.0.123456',
  },
  actionResults: \{\},  // Results from executed actions
  actionErrors: \{\},   // Errors from failed actions
};

const html = await templateEngine.render(templateHtml, context);

// Precompile for performance (cached)
await templateEngine.precompile('my-template', templateHtml);
const cachedHtml = await templateEngine.renderCompiled('my-template', context);
```

---

## Security Features

The SDK provides built-in security for block templates:

```typescript
// Templates are automatically sanitized to prevent XSS
const safeHtml = templateEngine.render(userTemplate, context);
// Dangerous tags and attributes are removed automatically

// Action parameters are validated before execution
const actionParams = {
  amount: userInput,  // Will be validated against schema
};

// Event handlers are bound securely
// data-action-click attributes are processed safely
// No inline JavaScript execution is allowed

// Template injection is prevented
// {{}} placeholders are escaped by default
// Use triple braces \{\{\{html\}\}\} only for trusted content
```

---

## Block Categories

Blocks are organized into standard Gutenberg categories:

```typescript
// Standard categories used by the SDK
const categories = {
  'formatting': 'Text formatting and display blocks',
  'widgets': 'Interactive widgets and forms',
  'design': 'Layout and design elements',
  'embed': 'Embedded content blocks',
  'common': 'Commonly used blocks',
};

// Factory methods use appropriate categories
BlockBuilder.createDisplayBlock(name, title)      // Uses 'formatting'
BlockBuilder.createInteractiveBlock(name, title)  // Uses 'widgets'
BlockBuilder.createWidgetBlock(name, title)       // Uses 'widgets' (alias)
BlockBuilder.createContainerBlock(name, title)    // Uses 'design'

// Or set custom category
blockBuilder.setCategory('custom-category');
```

---

## Block Supports

Blocks declare which Gutenberg features they support:

```typescript
// Add individual supports
blockBuilder
  .addSupport('align', true)           // Enable alignment
  .addSupport('anchor', true)          // Enable HTML anchors
  .addSupport('className', true)       // Enable custom CSS classes
  .addSupport('html', false)           // Disable HTML editing
  .addSupport('spacing', {
    margin: true,
    padding: true,
  });

// Enable common supports at once
blockBuilder.enableCommonSupports();
// This enables: align, anchor, className, and spacing

// Container blocks typically disable HTML editing
BlockBuilder.createContainerBlock('hashlink/layout', 'Layout')
  .enableCommonSupports()
  .addSupport('html', false);  // Prevent HTML mode

// The supports object in BlockDefinition
interface BlockSupports {
  align?: boolean | string[];
  anchor?: boolean;
  className?: boolean;
  customClassName?: boolean;
  html?: boolean;
  inserter?: boolean;
  multiple?: boolean;
  reusable?: boolean;
  spacing?: {
    margin?: boolean | string[];
    padding?: boolean | string[];
  };
}
```

---

## State Management

The SDK includes a `BlockStateManager` for managing block state:

```typescript
import { BlockStateManager } from '@hashgraphonline/standards-sdk';

const stateManager = new BlockStateManager(logger);

// Subscribe to state changes
stateManager.subscribe('block-123', (newState) => {
  console.log('Block state updated:', newState);
});

// Update block state
stateManager.updateState('block-123', {
  count: 42,
  lastAction: 'increment',
});

// Get current state
const currentState = stateManager.getState('block-123');

// Unsubscribe when done
stateManager.unsubscribe('block-123', subscriberCallback);
```

---

## Factory Methods

The SDK provides convenient factory methods for common block patterns:

```typescript
// Display Block - for showing content
const displayBlock = BlockBuilder.createDisplayBlock(
  'hashlink/info-card',
  'Information Card'
)
  .addAttribute('title', 'string', 'Info')
  .addAttribute('content', 'string', '')
  .setTemplate(displayTemplate);

// Interactive Block - for user interaction
const interactiveBlock = BlockBuilder.createInteractiveBlock(
  'hashlink/vote-button',
  'Vote Button'
)
  .addAttribute('option', 'string', '')
  .addAction('vote', voteActionTopicId)
  .setTemplate(voteTemplate);

// Widget Block - alias for interactive
const widgetBlock = BlockBuilder.createWidgetBlock(
  'hashlink/poll-widget',
  'Poll Widget'
);

// Container Block - for nesting other blocks
const containerBlock = BlockBuilder.createContainerBlock(
  'hashlink/grid-layout',
  'Grid Layout'
)
  .addAttribute('columns', 'number', 2)
  .addAttribute('gap', 'string', '1rem')
  .setTemplate(gridTemplate);
```

---

## Best Practices

### Template Design
- Keep templates simple - complex logic belongs in actions
- Use semantic HTML for accessibility
- Include ARIA labels where appropriate
- Avoid inline styles - use CSS classes
- Escape user content with `{{ }}` (double braces)
- Only use `{{{html}}}` for trusted content

### Attribute Design
- Choose intuitive attribute names
- Provide sensible default values
- Use appropriate types (string, number, boolean, etc.)
- Document attribute purpose in descriptions
- Consider using enums for limited options

### Performance
- Precompile frequently used templates
- Cache block definitions when possible
- Minimize template complexity
- Use efficient action implementations
- Batch state updates when possible

### Security
- Never trust user input in templates
- Validate all action parameters
- Sanitize HTML content
- Use data attributes for action binding
- Avoid eval() or Function() constructors
- Follow Content Security Policy (CSP) guidelines

### Composability
- Design blocks to be self-contained
- Use clear interfaces between blocks
- Support both standalone and nested usage
- Document dependencies clearly
- Version blocks appropriately
