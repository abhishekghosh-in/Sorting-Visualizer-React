import React from 'react'

export default function ArrayBar(props) {
    let myStyle = {
        display: "inline-block",
        backgroundColor: props.fillcolor,
        height: props.value + "px",
        width: "10px",
        border: "1px solid black",
        margin: "0.5px"
    }

  return (
    <div style = {myStyle}>
    </div>
  )
}
