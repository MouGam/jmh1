var http = require('http');
var fs = require('fs');
var url = require('url');

function make_list(filelist){

  var list = `<ul>`;
  var i = 0;

  while(i<filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + `</ul>`;

  return list;
}

function make_template(title, list, description){
  var template = `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEb</a></h1>
    ${list}
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;

  return template;
}

var app = http.createServer(function(request,response){

    var queryData = url.parse(request.url, true).query;
    var title = queryData.id;
    var pathname = url.parse(request.url, true).pathname;

    console.log(url.parse(request.url, true))

    if(pathname == '/'){

          fs.readdir(`./nodejs/data`, function(error, filelist){

            fs.readFile(`nodejs/data/${queryData.id}`, 'utf8', function(err, description){

              if(queryData.id === undefined){
                var title = 'welcome!!!';
                var description = 'hello, Node.js';
              } else{
                var title = `${queryData.id}`;
              }

              response.writeHead(200);
              response.end(make_template(title, make_list(filelist), description));

            });
          });
      } else{

            response.writeHead(404);
            response.end('not found');
      }
});

app.listen(3000);
