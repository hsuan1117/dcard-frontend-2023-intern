// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const data = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
            code: req.body.code,
        })
    }).then(res => res.json())

    res.status(200).json(data)
}
