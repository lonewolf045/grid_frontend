# Breadcrumb Component

A flexible breadcrumb navigation component that provides hierarchical navigation showing the user's current location in the application.

## Features

- **Auto-generation**: Automatically generates breadcrumbs from the current URL path
- **Custom items**: Support for custom breadcrumb items with labels, links, and icons
- **Responsive design**: Adapts to different screen sizes with smart truncation
- **Accessibility**: Full keyboard navigation and screen reader support
- **Icons**: Built-in icon support for common navigation items
- **Customizable**: Multiple variants and styling options

## Basic Usage

### Auto-generated Breadcrumbs

```jsx
import { Breadcrumb } from '../ui';

// Automatically generates breadcrumbs from current URL
<Breadcrumb />
```

### Custom Breadcrumbs

```jsx
import { Breadcrumb } from '../ui';

const breadcrumbItems = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Products', href: '/products', icon: 'products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', href: '/products/electronics/smartphones', isActive: true }
];

<Breadcrumb items={breadcrumbItems} />
```

### With Layout Component

```jsx
import { Layout, Breadcrumb } from '../ui';

const breadcrumbs = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Cart', href: '/cart', icon: 'cart', isActive: true }
];

<Layout.Page 
  title="My Cart"
  breadcrumbs={<Breadcrumb items={breadcrumbs} />}
>
  {/* Page content */}
</Layout.Page>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array` | `[]` | Array of breadcrumb items. If empty, auto-generates from URL |
| `separator` | `String` | `'/'` | Character used to separate breadcrumb items |
| `showHome` | `Boolean` | `true` | Whether to show home link in auto-generated breadcrumbs |
| `className` | `String` | `''` | Additional CSS classes |

## Breadcrumb Item Structure

```javascript
{
  label: 'Item Label',      // Required: Display text
  href: '/path/to/item',    // Optional: Link URL (if not provided, item is not clickable)
  icon: 'home',            // Optional: Icon name (home, products, cart, user, settings)
  isActive: false          // Optional: Whether this is the current/active item
}
```

## Available Icons

- `home` - Home/dashboard icon
- `products` - Products/shop icon  
- `cart` - Shopping cart icon
- `user` - User/profile icon
- `settings` - Settings/gear icon

## Variants

### Compact

```jsx
<Breadcrumb className="breadcrumb--compact" items={items} />
```

### Large

```jsx
<Breadcrumb className="breadcrumb--large" items={items} />
```

### With Background

```jsx
<Breadcrumb className="breadcrumb--background" items={items} />
```

### With Border

```jsx
<Breadcrumb className="breadcrumb--bordered" items={items} />
```

## Hook Usage

Use the `useBreadcrumbs` hook for more advanced breadcrumb generation:

```jsx
import { useBreadcrumbs } from '../ui';

const routeConfig = {
  '/products': { label: 'All Products', icon: 'products' },
  '/cart': { label: 'Shopping Cart', icon: 'cart' },
  '/profile': { label: 'My Profile', icon: 'user' }
};

const MyComponent = () => {
  const breadcrumbs = useBreadcrumbs(routeConfig);
  
  return <Breadcrumb items={breadcrumbs} />;
};
```

## Responsive Behavior

- **Desktop**: Shows all breadcrumb items with full labels
- **Tablet**: Truncates long labels with ellipsis
- **Mobile**: Shows only first and last items with ellipsis indicator
- **Small screens**: Further reduces text size and spacing

## Accessibility Features

- Semantic HTML with `nav`, `ol`, and `li` elements
- Proper ARIA labels and roles
- `aria-current="page"` for active items
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

## Styling

The component uses CSS custom properties for theming:

```css
.breadcrumb {
  /* Customize colors */
  --breadcrumb-text-color: var(--text-secondary);
  --breadcrumb-active-color: var(--primary-green);
  --breadcrumb-hover-bg: var(--bg-secondary);
  
  /* Customize spacing */
  --breadcrumb-gap: var(--space-2);
  --breadcrumb-padding: var(--space-1) var(--space-2);
}
```