import { useState } from "react";
import { Board } from "./Board";
import { list } from "postcss";
import next from "next";

export default  function Game(){
    const [history,setHistory]=useState([Array(9).fill(null)])
    const [currentMove,setCurrentMove]=useState(0)
    const xIsNext=currentMove%2===0
    const currentSquares=history[currentMove];
    const handlePlay=(nextSquares)=>{
        const nextHistory=[...history.slice(0,currentMove+1),nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length-1)
    }
    const jumpTo=(nextMove)=>{
     setCurrentMove(nextMove);
    }
    const moves=history.map((squares,move)=>{
        let description;
        if(move>0){
            description="Go to move #"+move
        }
        else {
            description ="Go to game start";
        }
        return (
            <li key={move} className="hover:bg-slate-400">
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return <div className="w-full h-screen flex flex-col items-center justify-center">
       <div className="flex gap-8">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        <div>
            <ol className="list-decimal list-inside relative top-5 ">
                {moves}
            </ol>
        </div>
       </div>
    </div>
}