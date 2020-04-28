var rect = require('./rectangle') //importing the module
function solveRect(a, b) {
    console.info(`solving ${a} ${b}`)
    rect(a,b, (err, rectangle) => {
        if (err) {
            console.error(`ERROR: ${err.message}`)
        } else{
            console.info(`area: ${rectangle.area()} _ perimeter: ${rectangle.perimeter()}`)
        }
    })


}
solveRect(3,4)
solveRect(3,0)
solveRect(0,4)
solveRect(0,0)
solveRect(8,7)
