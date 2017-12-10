var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var server = http.createServer(function(request,response){
    request.setEncoding('utf8');
    var resurl = request.url;
    console.log(resurl);
    var pathname = url.parse(resurl).pathname.toString();
    //文件根目录设定
    if(pathname.indexof('.') == -1){
        pathname += '/index.html';
    }
    var extname = path.extname(pathname);
    var ContentType = getMine(extname);

    fs.readFile(path.normalize("./static" + pathname),function(err,data){
        if(err){
            console.log(err);
            response.writeHead("404",{"Content-type":"text/html;charset=UTF8"})
            response.end("404");
        }else{
            response.writeHead('200',{"Content-type":ContentType+";charset=UTF8"})
            response.end(data)
        }
    })

});

function getMine(extname){

    var data = fs.readFileSync('./mime.json');
    data = JSON.parse(data);

    return data[extname];
}


server.listen(3000,'127.0.0.1');