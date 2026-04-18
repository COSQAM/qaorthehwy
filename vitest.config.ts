import { defineConfig } from 'vitest/config';
import path from 'path';

const imageStub = path.resolve(__dirname, 'src/config/__tests__/stubs/image-stub.ts');

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'src/**/__tests__/**/*.test.ts',
      'scripts/**/__tests__/**/*.test.{js,mjs,ts}',
    ],
  },
  plugins: [
    {
      name: 'image-stub',
      resolveId(id) {
        if (/\.(png|webp|svg|jpg|jpeg|gif|avif)$/.test(id)) {
          return imageStub;
        }
      },
    },
  ],
});
