"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [rowA, setRowA] = useState(0);
  const [colA, setColA] = useState(0);
  const [rowB, setRowB] = useState(0);
  const [colB, setColB] = useState(0);
  const [result,setResult] = useState([]);

  useEffect(() => {
    //make state change visible
  });

  //Controller Methods

  function getRowA(size){
    setRowA(size);
  }
  
  function getColumnA(size){
    setColA(size);
  }
  
  function getRowB(size){
    setRowB(size);
  }
  
  function getColumnB(size){
    setColB(size);
  }

  function operate(matA,matB,rA,cA,rB,cB){
    if(cA!=rB){
      return null;
    }
    
    const resultMatrix = Array.from({ length: rA }, () => new Array(Math.max(0,cB)).fill(0));
      
      for(let i=0;i<rA;i++){
        for(let j=0;j<cB;j++){
          for (let k = 0; k < cA; k++) {
            resultMatrix[i][j] += matA[i][k] * matB[k][j];
          }
        }
      }
      
      return resultMatrix;
  }

  function multiply(e){
    e.preventDefault();
    e.target.disabled=true;
    const matrixA = Array.from({ length: rowA }, () => new Array(Math.max(0,colA)));
    const matrixB = Array.from({ length: rowB }, () => new Array(Math.max(0,colB)));

    //Fetching values and creating matrix
    let inputs = document.querySelectorAll("input[type=number]");
    for(let i of inputs){
      if(i!=undefined){
        i.disabled = true;
        let id = i.id;
        if(id){
          id=id.split("_");
          if(id.length===3&&id[0]==="A"){
            if(i.value)
              matrixA[id[1]][id[2]]=parseFloat(i.value);
            else
              matrixA[id[1]][id[2]]=0;
          }
            
          else if(id.length===3&&id[0]==="B") {
            if(i.value)
              matrixB[id[1]][id[2]]=parseFloat(i.value);
            else
              matrixB[id[1]][id[2]]=0;
          }
        }
      }
    }
    
    const ans = operate(matrixA,matrixB,rowA,colA,rowB,colB);

    //Incompatible matrices
    if(ans===null){
      alert("Matrices are incompatible, can't perform multiplication.");
      reset();
    }
    //Compatible Matrices
    else{
      setResult(ans);
    }
  }
  
  function reset(){
    let inputs = document.querySelectorAll("input[type=number]");
    for(let i of inputs){
      if(i!=undefined){
        i.disabled = false;
      }
    }
    setRowA(0);
    setColA(0);
    setRowB(0);
    setColB(0);
    setResult([]);
  }

  return (
    <main className="container grid my-10 mx-auto">
      <h1 className="text-purple-700 text-6xl max-sm:text-4xl text-center font-serif font-semibold">
        Matrix Multiplication
      </h1>
      <button type="button" className="px-10 py-5 w-fit mx-16 mt-10 bg-red-700 hover:bg-red-600 text-white rounded-md" onClick={(e)=>{reset();}}>Reset</button>
      <div className="flex flex-wrap w-full justify-around mt-10">
        <div className="matrixA">
          <p className="text-xl max-sm:text-lg my-2">
            Enter the size of matrix A
          </p>
          <div className="flex justify-around bg-white border-gray-50 border rounded-2xl p-10 min-w-80 max-w-full w-96">
            <p>Row:</p>
            <input
              type="number"
              name="rowA"
              id="rowA"
              min={0}
              value={rowA}
              onChange={(e) => {
                getRowA(e.target.value);
              }}
            />
            <p>Column:</p>
            <input
              type="number"
              name="colA"
              id="colA"
              min={0}
              value={colA}
              onChange={(e) => {
                getColumnA(e.target.value);
              }}
            />
          </div>
          {rowA>0&&colA>0?
            <div className="flex mt-10 justify-around items-center bg-white border-gray-50 border rounded-2xl p-10 min-w-80 w-fit overflow-auto">
            <p>A:</p>
            <div className="flex flex-col flex-nowrap border-black border-x-4 border-y-0 rounded-2xl p-5">
              {[...Array(Math.max(0, rowA))].map((x,i)=>{
                return (
                  <div className="flex justify-around flex-nowrap" key={`A_${i}`}>
                  {[...Array(Math.max(0, colA)).keys()].map((x1,i1)=>{
                    return <input type="number" className="m-px" name={`A_${i}_${i1}`} id={`A_${i}_${i1}`} key={`A_${i}_${i1}`} title={`[${i},${i1}]`} defaultValue={0} />
                  })}
                  </div>
                );
              })}
            </div>
          </div>
          :""}   
        </div>
        <div className="matrixB">
          <p className="text-xl max-sm:text-lg my-2">
            Enter the size of matrix B
          </p>
          <div className="flex justify-around bg-white border-gray-50 border rounded-2xl p-10 min-w-80 max-w-full w-96">
            <p>Row:</p>
            <input
              type="number"
              name="rowB"
              id="rowB"
              min={0}
              value={rowB}
              onChange={(e) => {
                getRowB(e.target.value);
              }}
            />
            <p>Column:</p>
            <input
              type="number"
              name="colB"
              id="colB"
              min={0}
              value={colB}
              onChange={(e) => {
                getColumnB(e.target.value);
              }}
            />
          </div>
          {rowB>0&&colB>0?
            <div className="flex mt-10 justify-around items-center bg-white border-gray-50 border rounded-2xl p-10 min-w-80 w-fit overflow-auto">
            <p>B:</p>
            <div className="flex flex-col flex-nowrap border-black border-x-4 border-y-0 rounded-2xl p-5">
              {[...Array(Math.max(0, rowB))].map((x,i)=>{
                return (
                  <div className="flex justify-around flex-nowrap" key={`B_${i}`}>
                  {[...Array(Math.max(0, colB)).keys()].map((x1,i1)=>{
                    return <input type="number" className="m-px" name={`B_${i}_${i1}`} id={`B_${i}_${i1}`} key={`B_${i}_${i1}`} title={`[${i},${i1}]`} defaultValue={0} />
                  })}
                  </div>
                );
              })}
            </div>
          </div>
          :""}   
        </div>
      </div>
      {rowA>0&&colA>0&&rowB>0&&colB>0?
      <button type="button" className="px-10 py-5 w-fit justify-self-center mt-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md" onClick={(e)=>{multiply(e)}}>Multiply</button>
      :""}
      {result.length>0?
      <div className="solution justify-self-center flex mt-10 justify-around items-center bg-white border-gray-50 border rounded-2xl p-10 w-fit min-w-80 overflow-auto">
      <h1>Result:</h1>
      <table className="flex flex-col flex-nowrap border-collapse border-black border-x-4 border-y-0 rounded-2xl p-5">
            <tbody>
              <tr>
                <th className="border-2">Index</th>
                {[...Array(Math.max(0,colB))].map((x,i)=>{
                  return <th className="border-2" key={`th_${i}`}>C{i}</th>
                })}
              </tr>
            {result.map((x,i)=>{
              return (
                <tr key={`Result_${i}`}>
                <th className="m-0.5 border-2 min-w-10 text-center" key={`td_${i}`}>R{i}</th>
                {x.map((x1,i1)=>{
                  return <td className="m-0.5 border-2 min-w-10 text-center" key={`Result_${i}_${i1}`}>{x1}</td>
                })}
                </tr>
              );
            })}
            </tbody>
          </table>
    </div>
    :""}
    </main>
  );
}
