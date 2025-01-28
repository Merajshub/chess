import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";



export const Landing = () =>{
    const navigate = useNavigate();


    return <div className="">
        <div className="grid grid-cols-1 md: grid grid-cols-2">
            <div>
                <img src="/Chess1.jpg" alt="" className="h-screen " />
            </div>
            <div className="flex flex-col justify-center items-center text-white">
             <h1>Play Chess Online on the #3 Site!</h1>
             <div className="mt-8 justify-center">

             <Button onClick={()=>{navigate('/game')}}>Play Online</Button>
             </div>
             
            </div>
        </div>
    </div>

}