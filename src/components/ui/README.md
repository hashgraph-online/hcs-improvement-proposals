# UI Components

This directory contains reusable primitive UI components extracted from the Hashgraph Online homepage.

## New Components

### StatusBadge
Displays status indicators with animated dots.
```tsx
<StatusBadge variant="success" animated>Production Ready</StatusBadge>
```

### TransformCard
Cards with rotation and hover effects.
```tsx
<TransformCard rotation="rotate-2" shadow="xl">
  <p>Card content</p>
</TransformCard>
```

### GradientText
Text with brand gradient effects.
```tsx
<GradientText gradient="brand" as="h1">
  Hashgraph Online_
</GradientText>
```

### SyntaxHighlight
Inline code with syntax highlighting.
```tsx
<SyntaxHighlight code='import "collaborative"' theme="brand" />
```

### MetricCard
Display metrics with animations.
```tsx
<MetricCard 
  value="28M+" 
  label="Transactions" 
  color="blue"
  animateValue 
/>
```

### AnimatedBackground
Animated background effects.
```tsx
<AnimatedBackground 
  variant="blobs" 
  colors={['brand-blue', 'brand-purple']}
  intensity="medium" 
/>
```

### FlexGrid
Responsive grids with optional transforms.
```tsx
<FlexGrid columns={3} transforms gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</FlexGrid>
```

### Terminal
Terminal interface component.
```tsx
<Terminal title="hashgraph-cli">
  <Terminal.Line command="npm install @hashgraph/sdk" />
  <Terminal.Line output="✓ Installation complete" type="output" />
</Terminal>
```

## Import All
```tsx
import { 
  StatusBadge, 
  TransformCard, 
  GradientText, 
  SyntaxHighlight,
  MetricCard,
  AnimatedBackground,
  FlexGrid,
  Terminal
} from '@components/ui';
``` 
 
 
 
 