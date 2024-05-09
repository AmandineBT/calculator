import {useEffect, useState} from 'react';
import CalcProcess from './CalcProcess.js';
import Result from './Result.js';
import Buttons from './Buttons.js';
import { ProcessContext } from './ProcessContext.js';

export default function Calculator(){
    const [process, setProcess] = useState('');
    const [result, setResult] = useState(null);
    const [exponent, setExponent] = useState(false);
    const exponentArr=['⁰','¹', '²', '³', '⁴', '⁵','⁶','⁷', '⁸','⁹'];
    const exponentCorrespArr={'⁰' : 0 ,'¹':1, '²':2, '³':3, '⁴':4, '⁵':5,'⁶':6,'⁷':7, '⁸':8,'⁹':9};
    const REGEX_GROUPS = /(\d)(?=(\d\d\d)+(?!\d))/g;
    useEffect(() =>{
      handleProcessChanged();
    }, [process]);
    function handleProcessChanged(e){
      if(process){
        let calcProcess=process.replaceAll('\u202f', '').slice();
        let indexOfSqrt = process.indexOf('√');
        let indexOfExponent = -1;
        let indexOfPrct = process.indexOf('%');
        let indexOfParenthese = process.indexOf('(');
        let indexOfDoubleSlash = process.indexOf('//');
        if(indexOfParenthese !== -1){
          const parentheseRegexp=/([0-9]{1,}\(+)/g;
          let parenthese=calcProcess.match(parentheseRegexp);
          if(parenthese){
            for(let i=0;i<parenthese.length;i++){
              calcProcess = calcProcess.replace(parenthese[i],parenthese[i].replace('(', '*('));
            }
          }
        }
        if(indexOfSqrt !== -1){
          const sqrtRegexp=/(?<=[0-9])(√+)/g;
          let sqrtMulti=calcProcess.match(sqrtRegexp);
          if(sqrtMulti){
            for(let i=0; i<sqrtMulti.length;i++){
              calcProcess = calcProcess.replace(sqrtMulti[i],sqrtMulti[i].replace('√', '*√'));
            }
          }
          const regexp=/√([0-9]+)/g;
          let sqrt=calcProcess.match(regexp);
          if (sqrt){
            for(let i=0; i<sqrt.length;i++){
             calcProcess = calcProcess.replace(sqrt[i], Math.sqrt(sqrt[i].replace('√', '')));
           }
          }
        }
        for(var key in exponentCorrespArr){
          indexOfExponent= calcProcess.indexOf(key);
          if(indexOfExponent !== -1){
            break;
          }
        }
        if(indexOfExponent !== -1){
            const exponentRegexp=/(?<=[0-9)])([⁰¹²³⁴⁵⁶⁷⁸⁹]{1})/g;
            let exponentOccurrences = calcProcess.match(exponentRegexp);
            if(exponentOccurrences){
              for(let i=0; i<exponentOccurrences.length;i++){
                calcProcess= calcProcess.replace(exponentOccurrences[i], '**' + exponentCorrespArr[exponentOccurrences[i]]);
              }
            }
            const exponentNumRegexp= /([⁰¹²³⁴⁵⁶⁷⁸⁹]{1})/g;
            let exponentNumOccurrences = calcProcess.match(exponentNumRegexp);
            console.log(exponentNumOccurrences);
            if(exponentNumOccurrences){
              for(let i=0; i<exponentNumOccurrences.length;i++){
                calcProcess= calcProcess.replaceAll(exponentNumOccurrences[i], exponentCorrespArr[exponentNumOccurrences[i]]);
              }
            }  
        }
        
        if(indexOfPrct !==-1){
          calcProcess = calcProcess.replaceAll('%', '/100');
        }
        calcProcess = calcProcess.replaceAll(',','.');
        
        let newResult = '';
        try {
          newResult = Function("return " + calcProcess)();
        } catch (err) {
          if (e instanceof SyntaxError) {
              console.log(err.message);
          }
        }
        if(newResult && indexOfDoubleSlash === -1) {
          let space='\u202f';
          if (typeof newResult === 'number')newResult=newResult.toString().replace(REGEX_GROUPS, `$1${space}`);
          (newResult=='Infinity') ? setResult((r)=> 'Overflow: the result could not be calculated') : setResult((r)=> newResult);
        } else{
          setResult((r)=> 'Invalid Expression');
        }
      }
    }
    return(
        <>
          <ProcessContext.Provider value={process}>
            <CalcProcess setProcess={setProcess} setResult={setResult}/>
            <Result result={result}/>
            <Buttons exponentArr={exponentArr} exponentCorrespArr={exponentCorrespArr} exponent={exponent} setExponent={setExponent} setProcess={setProcess} setResult={setResult} handleProcessChanged={handleProcessChanged}/>
          </ProcessContext.Provider>
        </>
       
    )
}