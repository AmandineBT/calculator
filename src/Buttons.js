import Button from './Button.js';
export default function Buttons({exponent, setExponent, setResult, handleProcessChanged, setProcess, exponentArr}) {
    const numbers=[];
    for(let i=0; i<10;i++){
        numbers.push(i);
    }
    return(
        <>
          <div id="numbers">
            {numbers.map((number) => { return(
                 <Button 
                    key={number.toString()} 
                    btnText={number.toString()} 
                    setProcess={setProcess} 
                    exponent={exponent} 
                    setExponent={setExponent}
                    exponentArr={exponentArr}
                />
            )})
             
            }
          </div>
          <Operators setProcess={setProcess} setResult={setResult} exponent={exponent} setExponent={setExponent} handleProcessChanged={handleProcessChanged}/>
          <div id="exponents">
            <div>
            <Button btnText={(exponent) ? 'Hide exponents' : 'Show exponents'}  setProcess={setProcess} exponent={exponent} setExponent={setExponent} />
            
            </div>
            <div>
                {(exponent) && exponentArr.map((number) => {return(
                <Button 
                        key={number.toString()} 
                        btnText={number.toString()} 
                        setProcess={setProcess} 
                        exponent={exponent} 
                        setExponent={setExponent}
                    /> 
                )})}
            </div>
          </div>
        </>
    )
}
export function Operators({setResult,setProcess, exponent, setExponent, handleProcessChanged}){
    
    return(
        <div id="operators">
            <Button btnText='+'  setProcess={setProcess}   />
            <Button btnText='-'  setProcess={setProcess}  />
            <Button btnText='/'  setProcess={setProcess}  />
            <Button btnText='*'  setProcess={setProcess}  />
            <Button btnText='.'  setProcess={setProcess}  />
            <Button btnText='('  setProcess={setProcess}  />
            <Button btnText=')'  setProcess={setProcess}  />
            <Button btnText='%'  setProcess={setProcess}  />
            <Button btnText='√'  setProcess={setProcess}  />
            <div>
                <Button btnText='Erase'  setProcess={setProcess}  />
                <Button btnText='Clear'  setProcess={setProcess} setResult={setResult} />
            </div>
        </div>
    )
}