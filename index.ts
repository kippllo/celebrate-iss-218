import express from 'express';
import { celebrate, Joi } from 'celebrate';
const app = express();

app.use(express.json());

// Just navigate to http://localhost:3000/ and it should POST and show the error in NodeJS.
app.get('/', function(req, res) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <body>
  <script>
  
  fetch('', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({test: 'test'}),
  })
  
  </script>
  </body>
  </html>
  `);
});

app.post(
  '/',
  celebrate({
    body: Joi.object({
      test: Joi.string().external((value) => {
        throw new Error('nope');
      })
    })
  }),
  function(req, res) {
    res.status(201).end();
  }
);

const port = 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
