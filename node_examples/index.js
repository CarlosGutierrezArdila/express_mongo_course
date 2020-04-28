var rect = {
    perimeter: (x, y) => (2 * (x + y)),
    area: (x, y) => x * y
};
function solveRect(a, b) {
    console.info(`solving ${a} ${b}`)
    if (a < 0 || b < 0) {
        console.error("values must be grater than 0")
    } else {
        console.info(`area: ${rect.area(a, b)} _ perimeter: ${rect.perimeter(a, b)}`)

    }

}
solveRect(3,4)
solveRect(3,0)
solveRect(0,4)
solveRect(0,0)
solveRect(8,7)
