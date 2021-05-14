const wait = ms => new Promise( (resolve, rejects) => {
    console.log(ms + " ...")
    if(ms==10){
        rejects()
    }else{
        setTimeout(resolve, ms)
    }
}).then(() => {
    console.log(ms + " done")
    return ms
}).catch(() => {
    console.log(ms + " failed")
    return "-"
})

wait(10)