//log//
// create_task =>done
// delete_task => done
// get_all_task => done
//edit_task => done


'use strict';
const fs = require('fs');

// Tasks class
function Tasks (){
    var all = [];
    var id_container = {};
    var title;
    var done;
    
    this.id_ini = function (title,done){   
        id_container = {title: title, done: done, id: all.length};    
        all.push(id_container);
        return all.indexOf(id_container);
    };
    
    // "tworzy nowy task (przyjmuje nazwe i stan taska) , przypisuje mu ID i dodaje go do pliku tasks.json"
    this.create_task = function (title, done){
       title = String(title);
       done = Boolean(done);

        this.id_ini(title,done);

        fs.writeFileSync("tasks.json", JSON.stringify(all),"UTF-8" ,(err) => {
            if (err) throw err; 
        }); 

    };
    
    
    
    
    
    // "usuwa z pliku tasks.json task o zadanym ID"
    this.delete_task = function (task_id){
//     all = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));   
     delete all[task_id]; //not affect rest of indexes---> .slice!!!
     fs.writeFileSync("tasks.json", JSON.stringify(all),"UTF-8",(err) => {
        if (err) throw err;
     });
  
    };
    
    
    // "zwraca wszystkie pliki z pliku tasks.json"
    this.get_all_task= function(){
        all = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));  
        return all;  
    };
    
    // "no, edytuje task i zmienia jego wpis w pliku" 
    this.edit_task = function (task_id, new_title, done){
        all = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
        
        if(new_title !== '' && new_title !== all[task_id].title){
            all[task_id].title = String(new_title);
        } 
        if(done !== undefined && done !== all[task_id].done){
        all[task_id].done = Boolean(done);  
        }
        
        fs.writeFileSync("tasks.json", JSON.stringify(all),"UTF-8",(err) => {
        if (err) throw err;
            console.log('Edited file!');}); 
    };
    
    this.get_all_task(); 
    
}

module.exports.class = Tasks;

