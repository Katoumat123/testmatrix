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

 class maxtrix extends React.Component {
   state = {
     
     martix1: [[],[]],
     martix2:  [],
     row: 2,
     result: "",
     apidata: []
    }

    async getapi(){
        let tempData = null
        await axios.get("https://my-json-server.typicode.com/Katoumat123/testmatrix/matrix").then(res => {tempData = res.data})
        this.setState({row: tempData[0]["n"],martix1: tempData[0]["matrixA"],martix2: tempData[0]["matrixB"]});
    }

    get_api = e =>{
        this.getapi()
      }

   addmatrix = e =>{
      if(this.state.row < 6){
        this.state.martix1.push([])
        this.setState({row:this.state.row+1})
      }
   }
   delmatrix = e =>{
     if(this.state.row > 2){
       this.state.martix1.pop()
       this.setState({row:this.state.row-1})
     }
   }

   onChangematrixA = e =>{
        // let doit = this.state.matrix1
        let doit = this.state.martix1
        let cut = e.target.name.split("_")
        doit[parseInt(cut[1])][parseInt(cut[2])] = e.target.value 
        this.setState({martix1:doit})
        console.log(this.state.martix1);
   }

   onChangematrixB = e =>{
    // let doit = this.state.matrix1
    let doit = this.state.martix2
    let cut = e.target.name.split("_")
    doit[parseInt(cut[1])] = e.target.value 
    this.setState({martix2:doit})
    console.log(this.state.martix2);
}

   buildmatrixA(){
     let martrixAA  = []
     let row =  this.state.row
     for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
          martrixAA.push(<span><input style = {{margin: "10px" ,width: "50px"}} placeholder ={i+""+j} name = {"matrixA_"+i+"_"+j} onChange={this.onChangematrixA} value = {this.state.martix1[i][j]}></input></span>) 
        }
        martrixAA.push(<div></div>)
     }
     return martrixAA;
   } 

   buildmatrixB(){
     let martrixBB = []
     let row = this.state.row
     for (let i = 0; i < row; i++) {
       martrixBB.push(<span><input style = {{margin: "15px " ,width: "100px"}} placeholder={i} name = {"matrixB_"+i} onChange ={this.onChangematrixB} value = {this.state.martix2[i]}></input></span>)
       martrixBB.push(<div></div>)
     }
     
     return martrixBB;
   }
   
  


   showvalue = e =>{
     this.setState({result: calmartix(this.state.row,this.state.martix1,this.state.martix2)})
   }

  render(){
    return(
      <div>
        <h1>Testmatrix</h1>
        <div className ="TOP">
          <button style = {{margin: "10px"}} onClick={this.addmatrix}>ADD</button>
          <button style = {{margin: "10px"}} onClick={this.delmatrix}>DEL</button>
        </div>
        
        <div>
          <button style = {{margin: "10px"}} onClick={this.showvalue}>คำนวณ</button>
          <button style = {{margin: "10px"}} onClick={this.get_api}>ตัวอย่าง</button>
        </div>
        <div>
        <span>{this.buildmatrixA()}</span>
        </div>
        <div>
        <span>{this.buildmatrixB()}</span>
        </div>
        <div>
           {/* {console.log(this.state.martix1)} 
           {console.log(this.state.martix2)}  */}
          {this.state.result}
        </div>
      </div>

    );
  }

}

export default maxtrix;
