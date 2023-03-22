export default function generate_array(n, min, max) {
    let arr = [];
    for(let i = 0; i < n; i++) {
        arr.push(Math.floor(min + Math.random()*(max - min + 1)));
    }
    return arr;
}
