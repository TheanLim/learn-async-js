const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

function logNegativeARow(row){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (row.some(num => num < 0)){
                resolve(row);
            } else{
                reject(new Error('No negative numbers found in the row'))
            }
        }, 0);
    });
}

const promiseArr = array2D.map(row => logNegativeARow(row))

Promise.any(promiseArr)
    .then((response) => {
        console.log('At least a negative number is found at:', response);
    })
    .catch((error) => {
        console.error('No negative numbers are found in the array');
    });
