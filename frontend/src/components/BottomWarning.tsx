import { Link } from "react-router-dom";

interface BottomProps{
    label:string,
    linkText:string
    to:string

}

export function BottomWarning({label,linkText,to}:BottomProps){
    return(
        <div className="flex justify-center text-sm py-2 font-medium">

        <div >
            {label}
        </div>
        <Link to={to} className=" underline pl-1 cursor-pointer">
            {linkText}
        </Link>
        </div>
    )

}