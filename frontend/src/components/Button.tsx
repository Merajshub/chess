


export const Button = ({onClick,children}: {onClick: () => void,children: React.ReactNode})=>{
    return <button onClick={onClick} className="bg-green-500 hover:opacity-92 text-xl mt-5 p-2 border rounded-lg font-bold  "> {children}</button>

}