module.exports = (arr)=> {
    const random = Math.round(Math.random()*19)+1;
    arr.map(function (p) {
        if (p.chars.dexterity !== undefined){
        p.initiative=  p.chars.dexterity + random
            }
        else {
            p.initiative=  p.dexterity + random
        }
    });
    arr.sort(compareByInitiave);
    function compareByInitiave(a, b) {

        const genreA = a.initiative;
        const genreB = b.initiative;

        let comparison = 0;
        if (genreA < genreB) {
            return 1;
        } else if (genreA > genreB) {
            return -1;
        }
        return comparison;
    }
};