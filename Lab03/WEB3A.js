const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/calculate', (req, res) => {
  
    const { x, y } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number' || x <= 0 || y <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    let { sx = 0, sy = 0, count = 0 } = req.cookies;

    sx = parseInt(sx, 10);
    sy = parseInt(sy, 10);
    count = parseInt(count, 10);

    console.log(`Before: sx=${sx}, sy=${sy}, count=${count}`);
    sx += x;
    sy += y;
    count += 1;
    console.log(`After: sx=${sx}, sy=${sy}, count=${count}`);

    if (count % 5 === 0) {
        const result = { sx, sy };
        sx = 0;
        sy = 0;
        res.cookie('sx', sx);
        res.cookie('sy', sy);
        res.cookie('count', count);
        return res.json(result);
    }

    res.cookie('sx', sx);
    res.cookie('sy', sy);
    res.cookie('count', count);
    res.json({ sx, sy });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});