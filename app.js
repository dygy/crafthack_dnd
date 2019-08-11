module.exports =(wsts,arr)=>{
        if (arr[0].id < 5) {
            wsts[arr[0].id].send(
                JSON.stringify(
                    {
                        type: 'turn',
                        body: ''
                    }
                )
            )
        }
    const lastElem = arr[0];
    arr.splice(0,1);
    arr.push(lastElem);
    return arr
};
