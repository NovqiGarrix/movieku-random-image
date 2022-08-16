import { OpineRequest, OpineResponse } from '../deps.ts';
import logger from '../utils/logger.ts';

export const getRandomImage = async (_req: OpineRequest, res: OpineResponse) => {

    try {

        const imageDir = "./images";
        const files: Array<string> = []

        for await (const file of Deno.readDir(imageDir)) {
            files.push(`${imageDir}/${file.name}`);
        }

        const randomImage = files[Math.floor(Math.random() * files.length)];

        res.setHeader("Context-Type", "image/png");
        res.body = await Deno.readFile(randomImage);

        return res.end();

    } catch (error) {
        logger.error(error);
        return res.setStatus(500).send(error.message);
    }

}