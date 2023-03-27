export default function selection_sort(array) {
    let n = array.length;
    let arr = [...array];
    let moves = [];
    for(let i = 0; i < n-1; i++) {
        let min_idx = i;
        for(let j = i+1; j < n; j++) {
            moves.push([0, j, min_idx]);
            moves.push([2, j, min_idx]);
            if(arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
        moves.push([5, min_idx, i]);
        moves.push([5, i, min_idx]);
        moves.push([1, i, min_idx]);
        moves.push([2, i, min_idx]);
    }
    return moves;
}