import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';
const math = require('mathjs');

function copyArray(n,matrix1){
  let arr = []                                            
   for(let i = 0;i < n ; i++){
       arr.push([])                                              
       arr[i] = [...matrix1[i]]                                    
   }
   return arr;

}

  function calmartix(n,matrixA,martixB) {
    let matrix1 = copyArray(n,matrixA)
    let matrix2 = [...martixB]
    let inv_matrixA = math.inv(matrix1)

    let arr = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
    let X = [];

    
            X = math.multiply(inv_matrixA, matrix2)
        
        
        for(let i = 0 ;i < X.length ; i++){
            arr.push(<div className="result"> X{i+1} = {X[i].toFixed(14)}</div>)
        }
        return arr
}

 class App extends React.Component {
   state = {
     martix1: [[],[]],
     martix2:  [],
     row: 2,
     ERROR: "",
     result: "",
     apidata: []
    }



   buildmatrix(){
     let martrixAA  = []
     let row =  this.state.row
     for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
          martrixAA.push(<span><input style = {{margin: "10px"}}></input></span>) 
        }
        martrixAA.push(<div></div>)
     }
     return martrixAA;
   } 

  render(){
    return(
      <div>
        <h1>Testmatrix</h1>
        <div className ="TOP">
          <button style = {{margin: "10px"}} onClick="">ADD</button>
          <button style = {{margin: "10px"}} onClick="">DEL</button>
        </div>
        
        <div>
          <button style = {{margin: "10px"}} onClick="">คำนวณ</button>
          <button style = {{margin: "10px"}} onClick="">ตัวอย่าง</button>
        </div>
        <div>
        {this.buildmatrix()}
        </div>
      </div>

    );
  }

}

export default App;
