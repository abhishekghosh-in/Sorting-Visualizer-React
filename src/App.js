import './App.css';
import { useState, useEffect } from 'react';
// Components
import ArrayBar from './Components/ArrayBar';
// Functions
import generate_array from './Functions/generate_array';
import bubble_sort from './Functions/bubble_sort';
import insertion_sort from './Functions/insertion_sort';
import merge_sort from './Functions/merge_sort';
import quick_sort from './Functions/quick_sort';
import selection_sort from './Functions/selection_sort';

// Array Specifications
let sizeArray = 20;
let minArray = 5;
let maxArray = 300;
let firstColor = "orange";
let secondColor = "grey";
let thirdColor = "pink";

function App() {

  const [disableFlag, setDisableFlag] = useState(false);
  const [speed, setSpeed] = useState(25);

  let color_temp = [...Array(sizeArray)].map((_, i) => firstColor);
  const [color, setColor] = useState(color_temp);

  let array_temp = generate_array(sizeArray, minArray, maxArray);
  const [array, setArray] = useState(array_temp);
  useEffect(() => {
    console.log("Array is " + array);
  }, [array]);

  const reset_array = () => {
    array_temp = generate_array(sizeArray, minArray, maxArray);
    setArray(array_temp);
  }

  const perform_sorting = (moves) => {
    setDisableFlag(true);
    console.log("Buttons disabled");
    array_temp = [...array];
    color_temp = [...color];

    let movesLength = moves.length;
    for(let i = 0; i < movesLength; i++) {
      setTimeout(() => {
        let type = moves[i][0];
        let idx1 = moves[i][1];
        let idx2 = moves[i][2];
        let newArray = [...array_temp];
        let newColor = [...color_temp];
        if(type === 0) {
          // 0 means comparison of [idx1] and [idx2]
          newColor[idx1] = secondColor;
          newColor[idx2] = secondColor;
        } else if(type === 1) {
          // 1 means swapping [idx1] with [idx2]
          let temp = newArray[idx1];
          newArray[idx1] = newArray[idx2];
          newArray[idx2] = temp;
        } else if(type === 2) {
          // 2 means reverting [idx1] and [idx2] to original
          newColor[idx1] = firstColor;
          newColor[idx2] = firstColor;
        } else if(type === 3) {
          // 3 means resizing [idx1] to "idx2" integer
          newArray[idx1] = idx2;
        } else if(type === 4) {
          // 4 means just changing color of [idx1] to second
          newColor[idx1] = secondColor;
        } else if(type === 5) {
          // 5 means just toggling color of [idx1] between third and first
          if(newColor[idx1] === firstColor) {
            newColor[idx1] = thirdColor;
          } else {
            newColor[idx1] = firstColor;
          }
        }
        array_temp = newArray;
        color_temp = newColor;
        setArray(newArray);
        setColor(newColor);
      }, i*speed);
    }
    setTimeout(() => {
      setDisableFlag(false);
      console.log("Buttons enabled");
    }, speed * movesLength);
  }

  const bubble_sort_array = () => {
    let moves = bubble_sort(array);
    perform_sorting(moves);
  }

  const insertion_sort_array = () => {
    let moves = insertion_sort(array);
    perform_sorting(moves);
  }

  const merge_sort_array = () => {
    let moves = merge_sort(array);
    perform_sorting(moves);
  }

  const quick_sort_array = () => {
    let moves = quick_sort(array);
    perform_sorting(moves);
  }

  const selection_sort_array = () => {
    let moves = selection_sort(array);
    perform_sorting(moves);
  }

  return (
    <div className="background-centeralign">
      <div className="upper-panel">
        <button onClick = {() => reset_array()} disabled={disableFlag}>Generate a new array</button>
        <button onClick = {() => bubble_sort_array() } disabled={disableFlag}>Bubble Sort !</button>
        <button onClick = {() => insertion_sort_array() } disabled={disableFlag}>Insertion Sort !</button>
        <button onClick = {() => merge_sort_array() } disabled={disableFlag}>Merge Sort !</button>
        <button onClick = {() => quick_sort_array() } disabled={disableFlag}>Quick Sort !</button>
        <button onClick = {() => selection_sort_array() } disabled={disableFlag}>Selection Sort !</button>
        <label htmlFor="customRange2" className="form-label">Speed</label>
        <h3>{5 - (speed-5)/20}</h3>
        <input type="range" min='5' max='85' step='20' value={90 - speed} onChange={(e) => setSpeed(90 - e.target.value)} className="form-range" id="customRange2" disabled = {disableFlag}></input>
      </div>
      
      <div className="array-bars-space">
        {array.map((value, index) => {
          return <ArrayBar key={index} index = {index} value={value} fillcolor = {color[index]}/>;
        })}
      </div>
    </div>
  );
}

export default App;
