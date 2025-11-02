// 新增入口文件
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;

let playerLastAction = null;
let sameCount = 0;

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url,'http://localhost:8080');

    if(parsedUrl.pathname === '/favicon.ico'){
        res.writeHead(200);
        res.end();
        return;
    }
    if(parsedUrl.pathname === '/game'){
  

        const query = parsedUrl.query;
        const playerAction = query.action;

        if(playerLastAction && playerLastAction === playerAction){
            sameCount++;
        } else {
            sameCount = 0;
        }

        if(sameCount >= 3){
            res.writeHead(500);
            res.end('你作弊！连续三次出一样的，游戏结束！');
            return;
        }

        const gameResult = game(playerAction);

        if(gameResult === 1){
            playerWon++;
        } else if(gameResult === -1){
            playerWon = 0;
        }

        if(playerWon >= 3){
            res.writeHead(500);
            res.end('你太厉害了，连续赢了三次，游戏结束！');
            return;
        }

        playerLastAction = playerAction;

        res.writeHead(200);
        res.end(`你出的是${playerAction}, 结果是${gameResult === 0 ? '平局' : gameResult === 1 ? '你赢了' : '你输了'}`);
    }

    // 处理根路径，返回HTML页面
    if(parsedUrl.pathname === '/'){
        fs.createReadStream('./index.html').pipe(res);
    }
}).listen(3334, () => {
    console.log('服务器已启动，访问地址：http://localhost:3333');
}
)
