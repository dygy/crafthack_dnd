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
    hide('event-form');
    hide('fight-form');
};

elem('form2show').onclick =function(){
    show('form2');
    hide   ('form1');
    hide   ('form3');
    hide('event-form');
    hide('fight-form');
};

elem('form3show').onclick=function(){
    show('form3');
    hide   ('form1');
    hide   ('form2');
    hide('event-form');
    hide('fight-form');
};
elem('fight-form').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
    hide('event-form');
   show('fight-form');
};
elem('createFight').onclick=function(){
    hide   ('form3');
    hide   ('form1');
    hide   ('form2');
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
    hide('event-form');
    hide('fight-form');
};