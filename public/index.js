const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => //('ONLINE');
ws.onclose= ()=> //('DISCONNECTED');
ws.onmessage = response => {
    //resposne.data
};

function elem (id){
    return document.getElementById(id)
}
function hide(id) {
    elem(id).style.visibility = hidden
};
function show (id) {
    elem(id).style.visibility = visible;
    console.log(elem(id).style.visibility);

};

const visible = 'visible';
const hidden = 'hidden';
elem("form1show").onclick=function(){
    show('form1');
    hide('form2');
    hide ('form3');
    hide   ('form4');
    hide('event-form');
    hide('fight-form');
};

elem('form2show').onclick =function(){
    show('form2');
    hide   ('form1');
    hide   ('form3');
    hide   ('form4');
    hide('event-form');
    hide('fight-form');
};

elem('form3show').onclick=function(){
    show('form3');
    hide   ('form1');
    hide   ('form2');
    hide   ('form4');
    hide('event-form');
    hide('fight-form');
};
elem('form4show').onclick=function(){
    show('form4');
    hide   ('form1');
    hide   ('form2');
    hide   ('form3');
    hide('event-form');
    hide('fight-form');
};

elem('fight-form').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
    hide   ('form4');
    hide('event-form');
   show('fight-form');
};
elem('createFight').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
    hide   ('form4');
    hide('event-form');
    show('fight-form');
};
elem('createEvent').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
    show('event-form');
    hide('fight-form');
};
elem('hideall').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
    hide   ('form4');

    hide('event-form');
    hide('fight-form');
};

fetching('user/1');
fetching('user/2');
fetching('user/3');
fetching('user/4');

function fetching(url) {
     fetch("/"+url)
        .then(response=>{
            return response.json()
        })
        .then(function (defs) {
            replace(defs,url[url.length-1])
        })
        .catch(
            // Отправить на сервер для метрики
        );
}
function replace(item,id) {
    console.log(item.chars);
    elem('ID'+id).innerText='ID: '+item.id
    elem('Name'+id).innerText='Name: '+item.name
    elem('Role'+id).innerText='Role: '+item.role
    elem('Race'+id).innerText='Race: '+item.race
    elem('Chars'+id).innerHTML=
        '<strong>Chars: </strong>'+'</br>' +
        '<div>Strength:'+JSON.stringify(item.chars.strength).noJSON()+'</div>'+ '</br>'+
        '<div>Constitution:'+JSON.stringify(item.chars.constitution).noJSON()+'</div>'+ '</br>'+
        '<div>Intelligence:'+JSON.stringify(item.chars.intelligence).noJSON()+'</div>'+ '</br>'+
    '<div>Dexterity:'+JSON.stringify(item.chars.dexterity).noJSON()+'</div>'+ '</br>'+
    '<div>Wisdom:'+JSON.stringify(item.chars.wisdom).noJSON()+'</div>'+ '</br>'+
    '<div>Charsima:'+JSON.stringify(item.chars.charisma).noJSON()+'</div>'+ '</br>';
    elem('ArmorClass'+id).innerText='Armor Class: '+item.armorClass
    elem('HitDice'+id).innerText='Hit Dice : '+item.hitDice
    elem('Hits'+id).innerHTML='<Strong>Hit: </Strong>'
        +item.hits
    elem('Initiative'+id).innerText='Initiative: '+item.initiative
    elem('Skills'+id).innerText='Skills: '+item.skills.toString();
    elem('Speed'+id).innerText='Speed: '+item.speed
    //elem('Biography'+id).innerText='Biography: '+item.biography
}

String.prototype.noJSON = function () {
    let str = this.replace(/\"/g,'')
    str=str.replace(/\{/g,'')
    return str.replace(/\}/g,'')
}