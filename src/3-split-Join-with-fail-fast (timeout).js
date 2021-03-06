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
    throw new Error("Valor inválido")
})

// Split-join with fail-fast
function runAll(ms_arr) {
  //return Promise.race(ms_arr.map(wait))//retorna a primeira que completar (erro ou sucesso) mas as outras ainda rodam por conta própria
  //return Promise.all(ms_arr.map(wait))//retorna os resultados em array e é fail fast
  return Promise.allSettled(ms_arr.map(wait))//retorna o outcome individual e roda todas
    .then((response) => {
      console.log("response");
      console.log(response);
    })
    .catch((error) => {
      console.log("e");
      console.log(error);
    });
}

runAll([7,8,9,10,11,12]);//com erro
//runAll([7,8,9,  11,12]);//sem erro