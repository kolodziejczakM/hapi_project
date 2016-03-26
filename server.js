'use strict';

const Hapi = require('hapi');
const Good = require('good');
const fs = require('fs');
var tasks = require("./tasks");




const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    
    
    
    //znaleźć w dokumentacji HAPI jak serwować cały katalog
     server.route({
        method: 'GET',
        path: '/home',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });
    
    
    
    server.route({
        method: 'GET',
        path: '/api/v1/tasks',
        handler: function (request, reply) {        
           reply(create.get_all_task());
        }
    }); 
   
    
  server.route({
  method: 'GET'
, path: '/api/v1/task/{id?}' 
, handler: function(req, reply) {
    if (req.params.id) {
      var xd =  create.get_all_task();
      if (xd.length <= req.params.id) {
        return reply('Nie znaleziono danych.').code(404);
      }
      return reply(xd[req.params.id]);
    }
    reply(xd);
  }
});
             

   server.route({
        method: 'POST',
        path: '/api/v1/tasks',
        handler: function (request, reply) { 
//           reply(create.create_task(request.payload.formTitle,request.payload.formDone));
            reply(create.create_task(request.payload.formTitle,request.payload.formDone));
        }
    }); 
    
     
       
    
     server.route({
        method: 'DELETE',
        path: '/api/v1/task/{id?}',
        handler: function (request, reply) {
      if (request.params.id) {
          var xd =  create.get_all_task(); 
            if (xd.length <= request.params.id) {
            return reply('Nie można usunąć. Wpis nie istnieje.').code(404);
                  }
                  return reply(create.delete_task(request.params.id));
    }
   
    }}); 
            
     
        
      server.route({
        method: 'PUT',
        path: '/api/v1/task/{id?}',
        handler: function (request, reply) {
      if (request.params.id) {
          var nowyTytul = "zamiatanko";
          var nowyDone = false;
          var xd =  create.get_all_task();   
            if (xd.length <= request.params.id) {
            return reply('Nie można edytować. Wpis nie istnieje.').code(404);
                  }
                  return reply(create.edit_task(request.params.id,nowyTytul));
    }
   
    }}); 
   
 
  var create = new tasks.class();   
   
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
