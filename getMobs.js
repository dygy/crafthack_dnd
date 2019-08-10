module .exports = (ids) => {
    const monsters=[];
//    const monsters = fetching('https://dnd5eapi.co/api/monsters');
    for (let x=0;x<ids.length;x++){
         fetching('https://dnd5eapi.co/api/monsters/'+ids[x])
    }

     function fetching(url) {
             fetch(url)
            .then(response => {
                return response.json()
            })
            .then(function (defs) {
                monsters.push(defs)
            })
            .catch(

            );
    }


};