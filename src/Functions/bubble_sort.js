export default function bubble_sort(array) {
    let n = array.length;
    // use JSON parse then stringify for nested arrays to create deep copy
    let arr = [...array];
    let moves = [];
    for(let i = 0; i < n-1; i++) {
        for(let j = 0; j < n-i-1; j++) {
            moves.push([0, j, j+1]);
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                moves.push([1, j, j+1]);
            }
            moves.push([2, j, j+1]);
        }
    }
    return moves;
}
