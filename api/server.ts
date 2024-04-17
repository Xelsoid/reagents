import { app } from "./src/app";

const port = 3000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is started: PORT ${port}`);
  console.log(`http://localhost:${port}`);
});
