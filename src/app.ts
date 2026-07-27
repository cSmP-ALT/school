
// Use CommonJS require to avoid missing type declaration errors when express types are not installed
// @ts-ignore
const express = require('express');

const app: any = express();
const PORT = 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});