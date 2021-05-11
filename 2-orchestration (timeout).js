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

async function main() {
  try{
    a = 5
    a = await wait(a)

    b = a*2
    b = await wait(b)

    c = b*2
    c = await wait(c)
  } catch (error) {
    console.log("ocorreu um erro...")
    console.log(error);
  }
}

main()