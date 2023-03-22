export default function insertion_sort(array) {
    let n = array.length;
    let arr = [...array];
    let moves = [];
    for(let i = 1; i < n; i++) {
        moves.push([0, i, i-1]);
        moves.push([2, i, i-1]);
        for(let j = i; j > 0 && arr[j-1] > arr[j]; j--) {
            moves.push([0, j, j-1]);
            let temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
            moves.push([1, j, j-1]);
            moves.push([2, j, j-1]);
        }
    }
    return moves;
}
