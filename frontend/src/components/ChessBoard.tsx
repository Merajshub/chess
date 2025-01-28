import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../Screens/Game";

export const ChessBoard = ({chess, board, socket, setBoard} : {
    chess: any,
    setBoard: any,
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    }|null)[][];
    socket: WebSocket;
} )=>{


    const [from,setFrom]  = useState<null | Square >(null);
    const [to, setTo]=  useState<null | Square>(null);

    return <div className="">
        {board.map((row,i)=>{
            return <div key={i} className="flex justify-center">
                {row.map((square,j)=>{
                    const sqaureRepersentation = String.fromCharCode(97 + (j%8))+ "" + (8-i) as Square;
                    return <div onClick={()=>{
                        if(!from){
                            setFrom(sqaureRepersentation);
                        }else{
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload : {
                                    move: {
                                        from,
                                    to:sqaureRepersentation
                                    }
                                    
                                }
                            }))
                            setFrom(null)
                            chess.move({
                                from,
                                to:sqaureRepersentation

                            });
                            setBoard(chess.board());
                            console.log({
                                from,
                                to:sqaureRepersentation
                            });
                            
                        }
                    }} 
                    
                    key={j} className={`w-16 h-16 ${(i+j)%2===0 ? 'bg-green-500': 'bg-neutral-300'}`}>
                        <div className="flex justify-center items-center flex-col  h-full">
                        {/* {square ? square.type:""} 
                                                */}
                         {square ? <img className="w-6" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`}/> :null}
                        </div>

                    </div>
                })}
            </div>
        })}
    </div>
}