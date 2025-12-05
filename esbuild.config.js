//	 esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['app.module.js'], // Your main JS entry point (adjust if different)
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true, // Minify JS for production
  sourcemap: true, // For easier debugging in development
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
}).catch(() => process.exit(1)); 
