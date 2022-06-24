import 'dotenv/config';
import { app } from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  global.console.log(`[server]: listening on port ${PORT}`);
});
