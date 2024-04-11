console.log("Server running!")

import {readFile} from 'fs/promises';
import {join} from 'path';


Bun.serve({
    async fetch(req) {
        const url = new URL(req.url);
        console.log(`Request for ${url}`);
        if (url.pathname === '/.well-known/assetLinks.json') {
            const filePath = join(process.cwd(), 'public/.well-known', 'assetLinks.json');
            try {
                const fileContent = await readFile(filePath, 'utf-8');

                return new Response(fileContent, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } catch (error) {
                return new Response('Internal Server Error', { status: 500 });
            }
        } else {
            return new Response('Not Found', { status: 404 });
        }
    },
});
