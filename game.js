module.exports = (arr) => {
    for (x=0;x<arr.length;x++){
        if (arr[x].hits.current <1){
          arr.splice(x,1);
          x--
        }
    }
    return arr
};