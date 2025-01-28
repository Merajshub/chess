import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board : Chess;
    private startTime: Date;
    private moveCount =  0;

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color: "black"
            }
        }))
    }

    makemove(socket: WebSocket, move:{
        from: string;
        to: string;
    }) {

        // validation here 
        // Is it the user move
        // Is this move valid
        console.log("hello1");
        

        if(this.moveCount % 2 === 0 && socket !== this.player1){
            // this mean move length is even and socket is not player1 but player2 is trying to move, instead of player1

            return;
        }
        if(this.moveCount % 2 === 1 && socket !== this.player2){

            return;
        }

        try {
            this.board.move(move)           
        } catch (error) {
            console.log(error);
            return;
            
        }

        if(this.board.isGameOver()){
            // Send message to both the players
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner: this.board.turn() === 'w' ? 'white' : 'black'
                }
            }))
            return;
        }

        if(this.moveCount % 2 === 0 ){
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload: move
            }))

        }else{
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload: move
            }))

        }
        this.moveCount++;

        // Add one more Gameover Logic like Time is over.

       
        

    }
} 