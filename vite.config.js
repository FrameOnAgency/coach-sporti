import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        booking: resolve(__dirname, 'booking.html'),
        blog: resolve(__dirname, 'blog.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
        contact: resolve(__dirname, 'contact.html'),
        transformations: resolve(__dirname, 'transformations.html'),
        'stripe-demo': resolve(__dirname, 'stripe-demo.html'),
      },
    },
  },
});
