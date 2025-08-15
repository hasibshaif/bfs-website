# BFS Website Design System

This document outlines the standardized design system for the BFS website, providing consistent styling, components, and utilities across all pages and components.

## Table of Contents

1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [CSS Custom Properties](#css-custom-properties)
4. [Component Library](#component-library)
5. [Utility Classes](#utility-classes)
6. [Usage Examples](#usage-examples)
7. [Migration Guide](#migration-guide)

## Overview

The BFS design system provides:
- **Standardized colors, typography, and spacing**
- **Reusable component library**
- **CSS custom properties for consistent theming**
- **Utility classes for common styling patterns**
- **Animation presets and transitions**

## Design Tokens

### Colors

#### Primary Colors
```typescript
primary: {
  50: '#f0f4ff',
  100: '#e0e9ff',
  200: '#c7d7ff',
  300: '#a5b8ff',
  400: '#8190ff',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
}
```

#### Background Colors
```typescript
background: {
  primary: 'linear-gradient(to bottom right, #030717, #000000)',
  secondary: 'linear-gradient(to bottom right, #010617, #000000)',
  card: 'rgba(255, 255, 255, 0.05)',
  cardHover: 'rgba(255, 255, 255, 0.08)',
  blue: 'rgba(59, 130, 246, 0.1)',
  blueHover: 'rgba(59, 130, 246, 0.2)',
}
```

#### Text Colors
```typescript
text: {
  primary: '#FFFFFF',
  secondary: 'rgba(255, 255, 255, 0.8)',
  tertiary: 'rgba(255, 255, 255, 0.6)',
  muted: 'rgba(255, 255, 255, 0.4)',
  blue: '#b3c5fc',
  blueLight: '#93c5fd',
}
```

### Typography

#### Fonts
```typescript
fonts: {
  primary: 'var(--font-azeret-mono)',    // Monospace font for headings
  secondary: 'var(--font-ubuntu)',       // Sans-serif font for body text
  fallback: 'Arial, Helvetica, sans-serif',
}
```

#### Font Weights
```typescript
fontWeights: {
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}
```

#### Font Sizes
```typescript
fontSizes: {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}
```

### Spacing
```typescript
spacing: {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
}
```

### Border Radius
```typescript
borderRadius: {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
}
```

## CSS Custom Properties

All design tokens are available as CSS custom properties in `app/design-tokens.css`:

### Color Variables
```css
--color-primary-500: #6366f1;
--color-bg-primary: #030717;
--color-text-primary: #FFFFFF;
--color-border-primary: rgba(255, 255, 255, 0.1);
```

### Typography Variables
```css
--font-family-primary: var(--font-azeret-mono);
--font-family-secondary: var(--font-ubuntu);
--font-weight-light: 300;
--font-size-lg: 1.125rem;
```

### Gradient Variables
```css
--gradient-text-primary: linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%);
--gradient-bg-primary: linear-gradient(to bottom right, #030717, #000000);
--gradient-border-blue: linear-gradient(to right, #3b82f6, #93c5fd);
```

## Component Library

### Typography Components

#### HeroTitle
```tsx
import { Typography } from '@/components/ui/DesignSystem';

<Typography.HeroTitle>Page Title</Typography.HeroTitle>
```

#### HeroSubtitle
```tsx
<Typography.HeroSubtitle>
  Descriptive subtitle text
</Typography.HeroSubtitle>
```

#### SectionTitle
```tsx
<Typography.SectionTitle>Section Name</Typography.SectionTitle>
```

#### CardTitle
```tsx
<Typography.CardTitle>Card Title</Typography.CardTitle>
```

#### BodyText
```tsx
<Typography.BodyText>
  Regular body text content
</Typography.BodyText>
```

#### MutedText
```tsx
<Typography.MutedText>Secondary information</Typography.MutedText>
```

### Layout Components

#### PageContainer
```tsx
import { Layout } from '@/components/ui/DesignSystem';

<Layout.PageContainer>
  {/* Page content */}
</Layout.PageContainer>
```

#### ContentContainer
```tsx
<Layout.ContentContainer maxWidth="max-w-6xl">
  {/* Main content */}
</Layout.ContentContainer>
```

#### HeroSection
```tsx
<Layout.HeroSection>
  <Typography.HeroTitle>Title</Typography.HeroTitle>
  <Typography.HeroSubtitle>Subtitle</Typography.HeroSubtitle>
</Layout.HeroSection>
```

#### Section
```tsx
<Layout.Section delay={0.2}>
  {/* Section content */}
</Layout.Section>
```

### Card Components

#### Base Card
```tsx
import { Card } from '@/components/ui/DesignSystem';

<Card.Base padding="lg" hover={true}>
  {/* Card content */}
</Card.Base>
```

#### Feature Card
```tsx
<Card.Feature>
  <Typography.CardTitle>Feature</Typography.CardTitle>
  <Typography.BodyText>Description</Typography.BodyText>
</Card.Feature>
```

#### Mission Card
```tsx
<Card.Mission>
  <Typography.SectionTitle>Our Mission</Typography.SectionTitle>
  <Typography.BodyText>Mission statement</Typography.BodyText>
</Card.Mission>
```

### Grid Components

#### Features Grid
```tsx
import { Grid } from '@/components/ui/DesignSystem';

<Grid.Features>
  <Card.Feature>Feature 1</Card.Feature>
  <Card.Feature>Feature 2</Card.Feature>
</Grid.Features>
```

#### Members Grid
```tsx
<Grid.Members>
  <Card.Feature>Member 1</Card.Feature>
  <Card.Feature>Member 2</Card.Feature>
</Grid.Members>
```

#### Gallery Grid
```tsx
<Grid.Gallery>
  {/* Gallery items */}
</Grid.Gallery>
```

### Animation Components

#### FadeIn
```tsx
import { Animated } from '@/components/ui/DesignSystem';

<Animated.FadeIn delay={0.2}>
  {/* Content with fade-in animation */}
</Animated.FadeIn>
```

#### ScaleIn
```tsx
<Animated.ScaleIn delay={0.1}>
  {/* Content with scale-in animation */}
</Animated.ScaleIn>
```

#### StaggerContainer
```tsx
<Animated.StaggerContainer>
  <Animated.StaggerItem>Item 1</Animated.StaggerItem>
  <Animated.StaggerItem>Item 2</Animated.StaggerItem>
</Animated.StaggerContainer>
```

### Utility Components

#### GlassMorphism
```tsx
import { Utility } from '@/components/ui/DesignSystem';

<Utility.GlassMorphism opacity={0.1}>
  {/* Glass morphism effect */}
</Utility.GlassMorphism>
```

#### GradientText
```tsx
<Utility.GradientText gradient="linear-gradient(to right, #FFFFFF, #b3c5fc)">
  Gradient text
</Utility.GradientText>
```

#### LoadingSpinner
```tsx
<Utility.LoadingSpinner />
```

## Utility Classes

### Text Gradients
```css
.text-gradient-primary    /* Primary gradient text */
.text-gradient-secondary  /* Secondary gradient text */
.text-gradient-blue       /* Blue gradient text */
```

### Background Gradients
```css
.bg-gradient-primary      /* Primary background gradient */
.bg-gradient-secondary    /* Secondary background gradient */
.bg-gradient-card         /* Card background gradient */
.bg-gradient-blue         /* Blue background gradient */
```

### Glass Morphism
```css
.glass-morphism           /* Glass morphism effect */
.glass-morphism-hover     /* Glass morphism with hover state */
```

### Typography Utilities
```css
.font-primary             /* Primary font family */
.font-secondary           /* Secondary font family */
.font-extralight          /* Extra light font weight */
.font-light               /* Light font weight */
```

### Text Color Utilities
```css
.text-primary             /* Primary text color */
.text-secondary           /* Secondary text color */
.text-tertiary            /* Tertiary text color */
.text-muted               /* Muted text color */
.text-blue                /* Blue text color */
.text-blue-light          /* Light blue text color */
```

### Background Color Utilities
```css
.bg-primary               /* Primary background color */
.bg-secondary             /* Secondary background color */
.bg-card                  /* Card background color */
.bg-card-hover            /* Card hover background color */
.bg-blue                  /* Blue background color */
.bg-blue-hover            /* Blue hover background color */
```

### Border Utilities
```css
.border-primary           /* Primary border color */
.border-secondary         /* Secondary border color */
.border-blue              /* Blue border color */
.border-blue-light        /* Light blue border color */
```

### Shadow Utilities
```css
.shadow-blue              /* Blue shadow */
.shadow-blue-glow         /* Blue glow shadow */
```

### Transition Utilities
```css
.transition-fast          /* Fast transition */
.transition-normal        /* Normal transition */
.transition-slow          /* Slow transition */
.transition-slower        /* Slower transition */
```

### Animation Utilities
```css
.animate-fade-in          /* Fade in animation */
.animate-fade-in-up       /* Fade in up animation */
.animate-scale-in         /* Scale in animation */
```

## Usage Examples

### Complete Page Example
```tsx
import { Layout, Typography, Card, Grid, Animated } from '@/components/ui/DesignSystem';

export default function ExamplePage() {
  return (
    <Layout.PageContainer>
      <Layout.ContentContainer>
        <Layout.HeroSection>
          <Typography.HeroTitle>Page Title</Typography.HeroTitle>
          <Typography.HeroSubtitle>
            Page description goes here
          </Typography.HeroSubtitle>
        </Layout.HeroSection>

        <Layout.Section delay={0.2}>
          <Typography.SectionTitle>Features</Typography.SectionTitle>
          <Grid.Features>
            <Animated.FadeIn delay={0.3}>
              <Card.Feature>
                <Typography.CardTitle>Feature 1</Typography.CardTitle>
                <Typography.BodyText>Description</Typography.BodyText>
              </Card.Feature>
            </Animated.FadeIn>
            <Animated.FadeIn delay={0.4}>
              <Card.Feature>
                <Typography.CardTitle>Feature 2</Typography.CardTitle>
                <Typography.BodyText>Description</Typography.BodyText>
              </Card.Feature>
            </Animated.FadeIn>
          </Grid.Features>
        </Layout.Section>
      </Layout.ContentContainer>
    </Layout.PageContainer>
  );
}
```

### Card with Custom Styling
```tsx
<Card.Base 
  padding="xl" 
  hover={true} 
  className="custom-additional-classes"
>
  <Typography.CardTitle>Custom Card</Typography.CardTitle>
  <Typography.BodyText>Content with custom styling</Typography.BodyText>
</Card.Base>
```

### Using CSS Custom Properties
```css
.custom-component {
  background: var(--gradient-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}
```

## Migration Guide

### Before (Old Style)
```tsx
<div className="relative bg-gradient-to-br from-[#030717] to-[#000000] w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
  <div className="relative z-10 pt-24 md:pt-32 pb-16 max-w-6xl mx-auto">
    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <h1 
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6"
        style={{
          fontFamily: "var(--font-azeret-mono)",
          background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Page Title
      </h1>
      <p 
        className="text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto"
        style={{ fontFamily: "var(--font-ubuntu)" }}
      >
        Page description
      </p>
    </motion.div>
  </div>
</div>
```

### After (New Design System)
```tsx
<Layout.PageContainer>
  <Layout.ContentContainer>
    <Layout.HeroSection>
      <Typography.HeroTitle>Page Title</Typography.HeroTitle>
      <Typography.HeroSubtitle>
        Page description
      </Typography.HeroSubtitle>
    </Layout.HeroSection>
  </Layout.ContentContainer>
</Layout.PageContainer>
```

### Benefits of Migration
1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Changes to design tokens update everywhere
3. **Reusability**: Components can be easily reused across pages
4. **Performance**: Reduced bundle size through shared styles
5. **Developer Experience**: Cleaner, more readable code

## Best Practices

1. **Always use design system components** instead of inline styles
2. **Extend components with className** for custom styling when needed
3. **Use CSS custom properties** for consistent theming
4. **Follow the component hierarchy** (Layout > Typography > Card > Grid)
5. **Use animation components** for consistent motion design
6. **Leverage utility classes** for quick styling adjustments

## File Structure

```
lib/
  design-system.ts          # Design tokens and utilities
app/
  design-tokens.css         # CSS custom properties
components/
  ui/
    DesignSystem.tsx        # Component library
```

This design system ensures consistency, maintainability, and scalability across the entire BFS website.
