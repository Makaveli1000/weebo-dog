// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'], // <--- CHANGE THIS to src/index.js
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
}).catch(() => process.exit(1));
