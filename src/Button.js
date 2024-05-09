import { useState, useContext } from "react";
import { ProcessContext } from "./ProcessContext";
export default function Button({exponent, setExponent,setProcess,setResult,btnText, disabled, onPressEnter/*, exponentArr*/}){ 
  //var field={};
 // useEffect(()=> {
    const process= useContext(ProcessContext);
    var field = document.getElementById('process-input');
  //}, [field]);
  var cursorPos;
  
  
  function getCursorPosition(){
      if(field) {return(field.selectionStart);}
      else return process.length !== 0  ? process.length -1 : 0;
  }
  function onBtnClick(){
    
    if(btnText !== 'Clear'){cursorPos = getCursorPosition();}
    if(btnText==='Clear') {
      setProcess((p)=>'');
      setResult((r)=>'');
    }
    else if(btnText === 'Show exponents' || btnText==="Hide exponents") {
      setExponent((ex) => !exponent);
      (field) && setTimeout(() => {field.selectionStart = cursorPos;});
    }
    else {
      
      let processPart1 = cursorPos > 0 ? process.substr(0, cursorPos) :'';
      let processPart2 = cursorPos > 0 ? process.substr(cursorPos, process.length -1) : process.substr(cursorPos, process.length);
      let newProcess = '';
      if (btnText==='Erase'&& cursorPos!==0){
        processPart1=process.substr(0, cursorPos -1);
        newProcess= processPart1 + processPart2;
        setProcess((p)=> newProcess);
        (field) && setTimeout(() => {field.selectionStart = cursorPos -1;});
      }
      /*else if(exponent){
        let exponentNumber= exponentArr[parseInt(btnText)];
        newProcess = processPart1 + exponentNumber + processPart2 ;
        setProcess( newProcess);
        (field) && setTimeout(() => { field.selectionStart = cursorPos +1;});
        setExponent((ex) => false);
      }*/
      else if(btnText!=='Erase'){
        newProcess = processPart1 + btnText + processPart2;
        setProcess((p)=> newProcess);
        (field) && setTimeout(() => {field.selectionStart = cursorPos +1;});
      }
    }
  }
  
  return(
    <button onClick={onBtnClick} disabled={disabled} className={"btn-" + btnText.toLowerCase().replaceAll(' ', '-') + " btn neumorphic"}>{btnText}</button>
  )
}