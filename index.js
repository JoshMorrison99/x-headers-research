const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(req.headers)
    res.json({ "x-real-ip": req.headers['x-real-ip'], "x-forwarded-for": req.headers['x-forwarded-for'], "x-forwarded-host": req.headers['x-forwarded-host'], "host": req.headers['host'] })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})