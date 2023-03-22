function merge(arr, st, mid, en, moves) {
    let n1 = mid - st + 1;
    let n2 = en - mid;
  
    // Create temp arrays
    let left_array = new Array(n1); 
    let right_array = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for(let i = 0; i < n1; i++) {
        left_array[i] = arr[st + i];
    }
    for(let i = 0; i < n2; i++) {
        right_array[i] = arr[mid+1 + i];
    }
  
    let i = 0, j = 0, k = st;
  
    while (i < n1 && j < n2) {
        moves.push([0, st+i, mid+1+j]);
        moves.push([2, st+i, mid+1+j]);
        if(left_array[i] <= right_array[j]) {
            arr[k] = left_array[i];
            i++;
        } else {
            arr[k] = right_array[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        moves.push([4, st+i, mid+1+j]);
        moves.push([5, st+i, mid+1+j]);
        arr[k] = left_array[i];
        i++;
        k++;
    }
    while (j < n2) {
        moves.push([4, mid+1+j, st+i]);
        moves.push([5, mid+1+j, st+i]);
        arr[k] = right_array[j];
        j++;
        k++;
    }
    for(let i = st; i <= en; i++) {
        moves.push([5, i, arr[i]]);
        moves.push([3, i, arr[i]]);
        moves.push([5, i, arr[i]]);
    }
}

function merge_sort_helper(arr, st, en, moves) {
    if(st < en) {
        let mid = Math.floor((st+en)/2);
        merge_sort_helper(arr, st, mid, moves);
        merge_sort_helper(arr, mid+1, en, moves);
        merge(arr, st, mid, en, moves);
    }
}

export default function merge_sort(array) {
    let n = array.length;
    let arr = [...array];
    let moves = [];
    merge_sort_helper(arr, 0, n-1, moves);
    return moves;
}
