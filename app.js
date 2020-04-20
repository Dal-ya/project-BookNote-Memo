const express = require('express');

const app = express();
app.set('port', process.env.NODE_ENV || 5001);

app.use('/hello', (req, res) => {
  res.send('hello world');
});

app.use((req, res, next) => {
  const err = new Error('404 NOT FOUND');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  let sendMessage;
  if (err.status === 404) {
    sendMessage = '<h1>404 찾으시는 페이지가 없습니다</h1>';
  } else {
    sendMessage = '<h1>서버 에러</h1>';
  }
  const message =
    req.app.get('env') === 'development' ? err.message : sendMessage;
  res.send(message);
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} server start...`);
});
