
import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";




export const  INIT_GAME = 'init_game'; 
export const MOVE = 'move';
export const GAME_OVER = 'game_over';


export const Game = ()=>{
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess())
    const [board,setBoard] = useState(chess.board())
    const [started ,setStarted] = useState(false)

    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            console.log(message);
            switch (message.type){
                case INIT_GAME :
                setBoard(chess.board())
                setStarted(true);
                console.log('Game Initiated');
                break;

                case MOVE:
                const move = message.payload;
                chess.move(move);
                setBoard(chess.board())
                console.log('Move made');
                break;

                case GAME_OVER: 
                console.log('Game is Over');
                break; 
            }
            

        }


    },[socket])

    if(!socket) return <div>Connecting...</div>
    
    
    return <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-10 ">

        <div className="grid grid-cols-6 gap-4 w-full">

        <div className="col-span-4  w-full">
            <ChessBoard chess = {chess} board = {board} setBoard = {setBoard} socket = {socket}/>
        </div>
        <div className=" col-span-2 w-full bg-green-300 justify-center flex items-center">
        

        { !started && <Button onClick={()=>{
            socket.send(JSON.stringify({
                type: INIT_GAME
            }))
        }}>Play Online</Button>}
            
        </div>
        </div>
        </div>

    </div>
}