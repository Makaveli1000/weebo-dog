//	 esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/app.module.js'], // <--- CHANGE THIS LINE!
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
}).catch(() => process.exit(1));
