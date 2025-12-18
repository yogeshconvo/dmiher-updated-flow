const a = [12, 23, 32, 233];
function sumArray(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total = total + arr[i]
    }
    return total;
}
console.log(sumArray(a));

const b = [12, 23, 32, 233];
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
console.log(findMax(b));

// const numbers = [10, 20, 30, 40];

// function findMax(arr) {
//     let max = arr[0];

//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] > max) {
//             max = arr[i];
//         }
//     }

//     return max;
// }

// console.log(findMax(numbers));