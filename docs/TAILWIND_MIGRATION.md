# TailwindCSS Migration Guide

This document outlines the patterns and practices used during the migration from pure CSS to TailwindCSS v4 utility classes.

## Migration Strategy

The migration was done incrementally, component by component, to ensure visual parity and minimize risk:

1. **Foundation Components** - Start with components used by others (Section.astro)
2. **Core Components** - Migrate commonly used components (Skills.astro, Hero.astro)
3. **Complex Components** - Handle components with advanced features (Experience.astro)
4. **Layout & Global** - Finish with page-level styles and global CSS

## Migration Patterns

### Common CSS to Tailwind Conversions

| CSS Property | Tailwind Class | Notes |
|-------------|----------------|-------|
| `max-width: 700px` | `max-w-[700px]` | Use arbitrary values for custom sizes |
| `margin: 0 auto 48px` | `mx-auto mb-12` | Break down shorthand properties |
| `display: flex` | `flex` | Direct mapping |
| `flex-direction: column` | `flex-col` | |
| `gap: 1rem` | `gap-4` | 1rem = 16px = gap-4 |
| `padding: 4rem` | `p-16` | 4rem = 64px = p-16 |
| `font-weight: 700` | `font-bold` | |
| `font-size: 1.5rem` | `text-2xl` | |
| `color: #4a5568` | `text-gray-600` | Use semantic color names |

### Responsive Design

- Mobile-first approach: Base classes apply to all screen sizes
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Example: `flex-row sm:flex-col-reverse` (row on desktop, column-reverse on mobile)

### Complex Components

For components with complex CSS that can't be easily replicated with utility classes:

1. **Keep minimal CSS**: Preserve only what can't be done with utilities (e.g., complex pseudo-elements, tooltips)
2. **Hybrid approach**: Use Tailwind for layout/basic styling, custom CSS for advanced features
3. **Document decisions**: Comment why custom CSS was retained

### Example Migrations

#### Section Component (Simple)
**Before:**
```css
section {
  max-width: 700px;
  margin: 0 auto 48px;
}

h2 {
  margin-bottom: 8px;
  font-weight: 700;
  line-height: 1.5;
  font-size: 1.5rem;
}
```

**After:**
```html
<section class="max-w-[700px] mx-auto mb-12 sm:mb-[38px]">
  <h2 class="mb-2 font-bold leading-normal text-2xl">
```

#### Skills Component (Pills)
**Before:**
```css
ul {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
}

li {
  align-items: center;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  gap: 4px;
  padding: 0.2rem 0.6rem;
}
```

**After:**
```html
<ul class="inline-flex gap-2 flex-wrap">
  <li class="flex items-center bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm font-medium gap-1 px-2.5 py-0.5">
```

#### Experience Component (Hybrid)
**Kept Custom CSS:**
```css
[data-title]:hover:after {
  opacity: 1;
  transition: all 0.1s ease-in-out 0.5s;
  visibility: visible;
}

[data-title]:after {
  content: attr(data-title);
  background-color: #333;
  color: #fff;
  /* ... tooltip styles that can't be replicated with utilities */
}
```

**Migrated to Tailwind:**
```html
<ul class="flex flex-col gap-8">
  <header class="flex justify-between items-start mb-1">
    <h3 class="font-medium text-gray-900">
```

## Best Practices

1. **Visual Parity First**: Always ensure the component looks identical after migration
2. **Test Responsiveness**: Check all breakpoints after migration
3. **Use Semantic Classes**: Prefer `text-gray-600` over `text-[#4a5568]`
4. **Keep It Simple**: If complex CSS is required, consider keeping it as custom CSS
5. **Document Decisions**: Comment why certain approaches were chosen
6. **Incremental Approach**: Migrate one component at a time
7. **Build & Test**: Run builds after each migration to catch issues early

## Benefits Achieved

- **Consistency**: Standardized spacing, colors, and typography using design tokens
- **Maintainability**: Reduced CSS codebase, easier to modify styles
- **Performance**: Smaller CSS bundle through Tailwind's purging
- **Developer Experience**: Better IntelliSense and autocomplete for styles
- **Responsive Design**: More predictable and consistent responsive behavior

## Future Contributions

When adding new components or modifying existing ones:

1. Use Tailwind utility classes first
2. Only add custom CSS when utilities can't achieve the desired result
3. Follow the established patterns in this guide
4. Ensure visual consistency with the design system
5. Test across different screen sizes