import './App.css';
import { useState, useEffect } from 'react';
// Components
import ArrayBar from './Components/ArrayBar';
// Functions
import generate_array from './Functions/generate_array';
import bubble_sort from './Functions/bubble_sort';
import insertion_sort from './Functions/insertion_sort';
import selection_sort from './Functions/selection_sort';
import merge_sort from './Functions/merge_sort';
import quick_sort from './Functions/quick_sort';
import heap_sort from './Functions/heap_sort';

// Array Specifications
let minArray = 20;
let maxArray = 350;
let firstColor = "#F98903";
let secondColor = "#C62727";
let thirdColor = "#FFA6D5";

function App() {

  const [disableFlag, setDisableFlag] = useState(false);
  const [speed, setSpeed] = useState(25);
  const [size, setSize] = useState(20);
  const [selectedOption, setSelectedOption] = useState("bubble");

  let color_temp = [...Array(size)].map((_, i) => firstColor);
  const [color, setColor] = useState(color_temp);

  let array_temp = generate_array(size, minArray, maxArray);
  const [array, setArray] = useState(array_temp);

  useEffect(() => {
    console.log("Array is " + array);
  }, [array]);

  const reset_array = () => {
    array_temp = generate_array(size, minArray, maxArray);
    let newColorTemp = [];
    for(let i = 0; i < size; i++) {
      newColorTemp.push(firstColor);
    }
    color_temp = newColorTemp;
    setArray(array_temp);
    setColor(color_temp);
  }

  const handle_size_change = (new_size) => {
    setSize(new_size);
    reset_array();
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

  const selection_sort_array = () => {
    let moves = selection_sort(array);
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

  const heap_sort_array = () => {
    let moves = heap_sort(array);
    perform_sorting(moves);
  }

  const print_speed = (givenSpeed) => {
    let speed_category = "Speed";
    switch(givenSpeed) {
      case 1:
        speed_category = "Super Slow";
        break;
      case 2:
        speed_category = "Slow";
        break;
      case 3:
        speed_category = "Moderate";
        break;
      case 4:
        speed_category = "Fast";
        break;
      case 5:
        speed_category = "Super Fast";
        break;
      default:
        speed_category = "Unknown Speed";
    }
    return speed_category;
  }

  const call_sorting_algorithm = () => {
    switch(selectedOption) {
      case "bubble":
        bubble_sort_array();
        break;
      case "insertion":
        insertion_sort_array();
        break;
      case "selection":
        selection_sort_array();
        break;
      case "merge":
        merge_sort_array();
        break;
      case "quick":
        quick_sort_array();
        break;
      case "heap":
        heap_sort_array();
        break;
      default:
        console.log("No sorting algorithm selected");
    }
  }

  return (
    <div className="background-centeralign">
      <div className="container-fluid">
        <div className="row">
          <h1 className="heading-front">Sorting Visualizer Project</h1>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="side-panel">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <h4 className="text-head">Algorithm: </h4>
                    <select className="form-control full-width" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} disabled={disableFlag}>
                      <option value="bubble">Bubble Sort</option>
                      <option value="insertion">Insertion Sort</option>
                      <option value="selection">Selection Sort</option>
                      <option value="merge">Merge Sort</option>
                      <option value="quick">Quick Sort</option>
                      <option value="heap">Heap Sort</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <button onClick = {() => reset_array()} className="btn btn-outline-primary full-width" disabled={disableFlag}>Reset Array</button>
                  </div>
                  <div className="col-6">
                  <button onClick = {() => call_sorting_algorithm()} className="btn btn-outline-success full-width" disabled={disableFlag}>Sort!</button>
                  </div>
                </div>
              </div>
              
              <h4 className="text-head">Speed: </h4>
              <h4 className="text-head">{print_speed(5 - (speed-5)/20)}</h4>
              <input type="range" min='5' max='85' step='20' value={90 - speed} onChange={(e) => setSpeed(90 - e.target.value)} className="form-range" id="customRange2" disabled = {disableFlag}></input>
              <h4 className="text-head">Size: </h4>
              <h4 className="text-head">{size}</h4>
              <input type="range" min='5' max='30' value={size} onChange={(e) => handle_size_change(e.target.value)} className="form-range" id="customRange2" disabled = {disableFlag}></input>
              
            </div>
          </div>
          <div className="col-8">
            <div className="array-bars-space">
              {array.map((value, index) => {
                return <ArrayBar key={index} index={index} value={value} fillcolor={color[index]}/>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
