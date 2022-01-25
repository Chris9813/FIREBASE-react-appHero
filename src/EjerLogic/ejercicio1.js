function ejericioA() {
    
    let number = []
    const rgx = /,/g


    for(let i = 0; i <= 100; i++ ){

        if(i%2 === 0 && i%5 === 0 && i !== 0){
          number.push([i, "buzz", "bazz"].join().replace(rgx, " "))
        } 

        
        if(i === 0 || i%2 === 0 && i%5 !== 0){
          number.push([i, "buzz"].join().replace(",", " "))
        } 

        if(i%5 === 0 && i !== 0 && i%2 !== 0){
          number.push([i, "bazz"].join().replace(",", " "))
        }
        
        else if(i !== 0 && i%2 !== 0 && i%5 !== 0) {
            number.push(i)
        }

        
    }

    return number
    
}

console.log(ejericioA())