module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0) {
        setTimeout(() =>
            callback(new Error("values must be grater than 0"), null)
            , 2000) //simulate delay

    } else {
        setTimeout(() =>
            callback(null, {
                perimeter : () => (2 * (x + y)), //returning object
                area : () => x * y
            }
            )
            , 2000)
    }
}
