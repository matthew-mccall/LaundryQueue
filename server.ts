import next from 'next'
import polka from 'polka'
import sirv from 'sirv'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  polka()
      .use(sirv('public'))
      .get('*', handle)
      .listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
});
