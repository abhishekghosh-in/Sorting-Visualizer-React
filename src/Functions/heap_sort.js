function heapify(arr, n, i, moves) {
    let largest = i;
    let l = 2*i + 1;
    let r = 2*i + 2;
    moves.push([0, l, largest]);
    moves.push([2, l, largest]);
    if(l < n && arr[l] > arr[largest]) {
        largest = l;
    }
    moves.push([0, r, largest]);
    moves.push([2, r, largest]);
    if(r < n && arr[r] > arr[largest]) {
        largest = r;
    }
    if(largest != i) {
        moves.push([0, i, largest]);
        moves.push([1, i, largest]);
        moves.push([2, i, largest]);
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest, moves);
    }
}

export default function heap_sort(array) {
    let n = array.length;
    let arr = [...array];
    let moves = [];
    // building heap
    for(let i = Math.floor(n/2) - 1; i >= 0; i--) {
        heapify(arr, n, i, moves);
    }
    for(let i = n-1; i > 0; i--) {
        moves.push([0, 0, i]);
        moves.push([1, 0, i]);
        moves.push([2, 0, i]);
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0, moves);
    }
    return moves;
}
