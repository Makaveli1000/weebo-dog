    // esbuild.config.js
    const esbuild = require('esbuild');

    esbuild.build({
      entryPoints: ['src/index.js'], // Assuming src/index.js is your main entry now
      outfile: 'dist/bundle.js',
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
      format: 'esm',      // <--- NEW: Output ES Module format
      platform: 'browser' // <--- NEW: Target browser environment
    }).catch(() => process.exit(1));
   
