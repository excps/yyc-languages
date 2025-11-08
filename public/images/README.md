# Images Directory

This folder contains local images for the YYC Languages website.

## Usage

### Adding Images

1. Place your image files in this directory (e.g., `logo.png`, `hero-image.jpg`, etc.)
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

### Referencing Images in Code

In your React components, reference images using the `/images/` path:

```tsx
// Example 1: Using img tag
<img src="/images/logo.png" alt="YYC Languages Logo" />

// Example 2: Using ImageWithFallback component
<ImageWithFallback
  src="/images/hero-background.jpg"
  alt="German language learning"
  className="w-full h-64 object-cover"
/>

// Example 3: As CSS background
<div style={{ backgroundImage: 'url(/images/background.jpg)' }}>
  Content here
</div>
```

### Build Output

When you run `npm run build`, these images will be:
- Copied to `build/images/`
- Accessible at `./images/your-image.jpg` in the production build

## Recommended Image Sizes

- **Hero images**: 1920x1080px or larger
- **Thumbnails**: 400x300px
- **Profile photos**: 400x400px (square)
- **Logos**: SVG format preferred, or PNG with transparent background

## Optimization Tips

- Compress images before adding them (use tools like TinyPNG, ImageOptim)
- Use WebP format for better compression
- Consider responsive images for different screen sizes
- Keep file sizes under 500KB when possible
