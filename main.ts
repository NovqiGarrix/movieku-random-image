
import { opine, configAsync, opineCors } from './deps.ts';

import { getRandomImage } from './handlers/getRandomImage.ts';
import logger from './utils/logger.ts';

const ENV = await configAsync();

const PORT = +(Deno.env.get("PORT") || ENV.PORT || "3004");
const app = opine();

app.use(opineCors({ origin: "*" }));

app.use((req, _, next) => {
    logger.info(`${req.method} ${req.url}`);
    return next();
})

app.get("/", getRandomImage);

const server = app.listen(PORT, () => logger.success(`Server listening on port ${PORT}`));

const signals = ["SIGINT", "SIGTERM"];
for (let signal of signals) {
    if (Deno.build.os === "windows") signal = "SIGBREAK";
    Deno.addSignalListener(signal as Deno.Signal, () => {
        server.close();
    })
}