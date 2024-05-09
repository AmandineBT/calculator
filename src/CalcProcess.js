import { useContext } from "react";
import { ProcessContext } from "./ProcessContext";
export default function CalcProcess({setProcess}) {
    const process = useContext(ProcessContext);
    const REGEX_GROUPS = /(\d)(?=(\d\d\d)+(?!\d))/g;
    let space='\u202f';
    return(
        <textarea id="process-input" className="text neumorphic neumorphic-txt" value={process.toString().replace(REGEX_GROUPS, `$1${space}`)} onChange={(e)=> setProcess(e.target.value)}
        />
    )
}