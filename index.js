// Express.js application
import express from 'express';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

// configuration
const
  __dirname = dirname(fileURLToPath( import.meta.url )) + sep,
  cfg = {
    port: 8080,
    dir: {
      root:   __dirname,
      public: __dirname + 'public' + sep,
      images: __dirname + 'public' + sep + 'images' + sep,
      static: __dirname + 'public' + sep + 'static' + sep,
      views:  __dirname + 'public' + sep + 'views' + sep
    }
  };

console.dir(cfg, { depth: null, color: true });

// Express initiation
const app = express();

// do not identify Express
app.disable('x-powered-by');

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

// serve favicon
app.use('/favicon.ico', express.static(cfg.dir.images + 'favicon.ico'));

// serve assets
app.use('/public', express.static(cfg.dir.public));

// log requests
app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

// homepage
app.get('/er/', (req, res) => {
    res.render('home', { title: 'whirlwindaster' });
});

// redirect to /er/
app.use((req, res) => {
    res.redirect('/er/');
});

app.listen(cfg.port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening at port ${ cfg.port }`);
});

// export defaults
export { cfg, app };