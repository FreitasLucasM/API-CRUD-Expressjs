 const http = require('http');

http
.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'application/json'});

    if(request.url === '/produto'){
        response.end(JSON.stringify({
            message: 'rota de produtos'
        }));
    }
    else if(request.url === '/usuario'){
        response.end(JSON.stringify({
            message: 'rota de usuarios'
        }))
    }else{
        response.end(JSON.stringify({
            message: 'sem rota'
        }))

    }

        



})
.listen(4001, ()=>{
    console.log('listening on http://localhost:4001');
})