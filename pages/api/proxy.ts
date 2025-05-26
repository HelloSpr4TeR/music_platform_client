import fetch from 'node-fetch';

export default async function handler(req, res) {
    const backendPath = req.url.replace('/api/proxy', '');
    const backendUrl = process.env.NEXT_PUBLIC_API_URL + backendPath;

    try {
        const backendRes = await fetch(backendUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(process.env.NEXT_PUBLIC_API_URL).host,
            },
            body: req.method === 'GET' || req.method === 'HEAD' ? null : req.body,
        });

        backendRes.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        const data = await backendRes.arrayBuffer();
        res.status(backendRes.status).send(Buffer.from(data));
    } catch (error) {
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
}