// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'], // This is now the true entry point that imports app.js
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
  format: 'esm',      // CRITICAL ADDITION: Output ES Module format
  platform: 'browser' // CRITICAL ADDITION: Target browser environment
}).catch(() => process.exit(1));
