function partition(array, low, high, moves) {
    let pivot = array[low];
    let st = low + 1;
    let en = high;

    while (true) {
        while (st <= en && array[en] >= pivot) {
            moves.push([0, en, low]);
            moves.push([2, en, low]);
            en--;
        }
        while (st <= en && array[st] <= pivot) {
            moves.push([0, st, low]);
            moves.push([2, st, low]);
            st++;
        }

        if (st <= en) {
            [array[st], array[en]] = [array[en], array[st]];
            moves.push([5, st, en]);
            moves.push([5, en, st]);
            moves.push([1, st, en]);
            moves.push([2, st, en]);
        } else {
            break;
        }
    }
    [array[low], array[en]] = [array[en], array[low]];
    moves.push([5, low, en]);
    moves.push([5, en, low]);
    moves.push([1, low, en]);
    moves.push([2, low, en]);
    return en;
}
   
function quick_sort_helper(arr, st, en, moves) {
    if (st < en) {
        let idx = partition(arr, st, en, moves);
        quick_sort_helper(arr, st, idx - 1, moves);
        quick_sort_helper(arr, idx + 1, en, moves);
    }
}

export default function quick_sort(array) {
    let n = array.length;
    let arr = [...array];
    let moves = [];
    quick_sort_helper(arr, 0, n-1, moves);
    return moves;
}
