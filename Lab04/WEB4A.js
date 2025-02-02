const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
    secret: 'P123456', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const { x, y } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number' || x <= 0 || y <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    req.session.sx = req.session.sx || 0;
    req.session.sy = req.session.sy || 0;
    req.session.count = req.session.count || 0;

    console.log(`Before: sx=${req.session.sx}, sy=${req.session.sy}, count=${req.session.count}`);
    
    req.session.sx += x;
    req.session.sy += y;
    req.session.count += 1;

    console.log(`After: sx=${req.session.sx}, sy=${req.session.sy}, count=${req.session.count}`);

    if (req.session.count % 5 === 0) {
        const result = { sx: req.session.sx, sy: req.session.sy };
        req.session.sx = 0;
        req.session.sy = 0;
        res.json(result);
    } else {
        res.json({ sx: req.session.sx, sy: req.session.sy });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});