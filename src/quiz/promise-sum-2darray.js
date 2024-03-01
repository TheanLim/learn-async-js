const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function sumARow(arr, rowIdx) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            reject(new Error('BAD INPUT: Expected array as input'));
            return;
        }

        setTimeout(() => {
            const sum = arr[rowIdx].reduce((acc, val) => acc + val, 0);
            resolve(sum);
        }, 0);
    });
}

async function calculateSum(){
    const promiseArr = array2D.map((_, i) => sumARow(array2D, i));

    try {
        const rowSums = await Promise.all(promiseArr);
        const totalSum = rowSums.reduce((acc, response) => acc + response, 0);
        console.log('Total Sum:', totalSum);
        return 'done'
    } catch (error){
        console.error(`Failed to fetch: ${error.message}`);
        return 'failed';
    }
}

calculateSum().then((status)=> console.log(status))
