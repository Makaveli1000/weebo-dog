const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/app.js'],
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
  format: 'esm',
  platform: 'browser'
}).catch(() => process.exit(1));
