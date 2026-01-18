export const Balance =({value}:{value:string})=>{
    return(
        <div className="flex ">
            <div className="mr-2 font-medium">
                Your Balance: 
            </div>
            <div>
                {value}
            </div>
           
        </div>
    )

}