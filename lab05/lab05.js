const http = require('http');
const fs = require('fs');
const path = require('path');


function setCacheHeaders(res, cacheParam) {
    switch (cacheParam) {
        case 'no-store':
            res.setHeader('Cache-Control', 'no-store');
            break;
        case 'max-age':
            res.setHeader('Cache-Control', 'max-age=3600'); 
            break;
        case 'etag':
            const etag = '"12345"'; 
            res.setHeader('ETag', etag);
            break;
        case 'last-modified':
            res.setHeader('Last-Modified', new Date().toUTCString());
            break;
        case 'expired':
            res.setHeader('Expires', new Date(Date.now() + 3600 * 1000).toUTCString()); 
            break;
        default:
            res.setHeader('Cache-Control', 'no-cache');
    }
}


const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const cacheParam = url.searchParams.get('cache_param') || 'no-cache';
    if (pathname === '/') {
        const htmlPath = path.join(__dirname, 'index.html');

        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('HTML file not found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    } else if (pathname === '/image') {
        const imagePath = path.join(__dirname, 'img.png');

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Image not found');
                return;
            }
            debugger;
            setCacheHeaders(res, cacheParam);
            res.writeHead(200, { 'Content-Type': 'image/png' });
           
            res.end(data);
        });

    } else if (pathname === '/script') {
        const scriptPath = path.join(__dirname, 'script.js');

        fs.readFile(scriptPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Script not found');
                return;
            }
            setCacheHeaders(res, cacheParam);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
             
            res.end(data); 
        });

    } else if(pathname === '/css'){
        const scriptPath = path.join(__dirname, 'index.css');

        fs.readFile(scriptPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Script not found');
                return;
            }
            setCacheHeaders(res, cacheParam);
            res.writeHead(200, { 'Content-Type': 'text/css' });
             
            res.end(data); 
        });

    }
     else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});



server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});


// const http = require('http');
// const url = require('url');

// const hostname = '127.0.0.1';
// const port = 3000;

// let count = 0; // Счетчик запросов
// let sx = 0; // Накопленная сумма по x
// let sy = 0; // Накопленная сумма по y

// const server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x, y');

//   if (req.method === 'OPTIONS') {
//     res.statusCode = 204;
//     res.end();
//     return;
//   }

//   if (req.method === 'POST') {
//     let body = '';

//     req.on('data', chunk => {
//       body += chunk.toString(); // Сборка частей тела запроса
//     });

//     req.on('end', () => {
//       try {
//         const postData = JSON.parse(body); // Парсим тело запроса как JSON
//         console.log('Полученные данные:', postData);

//         if (!postData.x || !postData.y || isNaN(postData.x) || isNaN(postData.y) || postData.x <= 0 || postData.y <= 0) {
//             res.statusCode = 400;
//             res.end('Некорректные данные в запросе');
//             return;
//           }
  
//           // Обработка данных
//           const { x, y } = postData;
//           sx += x;
//           sy += y;
//           count++; // Сложение чисел с уже накопленной суммой
          
//           if ((count-1) % 5 === 0) {
//             // Каждый пятый запрос: сброс счетчика путем приравнения его к x и y
//             sx = x;
//             sy = y;
//           }
//           // Формирование ответа
//           const response = {
//             sx,
//             sy
//           };
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify(response));
//         } catch (error) {
//         console.error('Ошибка при обработке запроса:', error);
//         res.statusCode = 400;
//         res.end('Ошибка в запросе');
//       }
//     });
//   } else {
//     res.statusCode = 405;
//     res.end('Метод не разрешен');
//   }
// });

// server.listen(port, hostname, () => {
//     console.log(`Сервер запущен на http://${hostname}:${port}/`);
// });



// const http = require('http');
// const url = require('url');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     res.statusCode = 204;
//     res.end();
//     return;
//   }

//   if (req.method === 'POST') {
//     let body = '';

//     req.on('data', chunk => {
//       body += chunk.toString(); // Сборка частей тела запроса
//     });

//     req.on('end', () => {
//       try {
//         const postData = JSON.parse(body); // Парсим тело запроса как JSON
//         console.log('Полученные данные:', postData);

//         if (!postData.x || !postData.y || isNaN(postData.x) || isNaN(postData.y) || postData.x <= 0 || postData.y <= 0) {
//             res.statusCode = 400;
//             res.end('Некорректные данные в запросе');
//             return;
//           }
  
//           // Обработка данных
//           const { x, y } = postData;
//           const result = x + y; // Пример обработки: сложение чисел
  
//           // Формирование ответа
//           const response = {
//             message: 'Данные успешно обработаны',
//             result
//           };
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify(response));
//         } catch (error) {
//         console.error('Ошибка при обработке запроса:', error);
//         res.statusCode = 400;
//         res.end('Ошибка в запросе');
//       }
//     });
//   } else {
//     res.statusCode = 405;
//     res.end('Метод не разрешен');
//   }
// });

// server.listen(port, hostname, () => {
//     console.log(`Сервер запущен на http://${hostname}:${port}/`);
// });