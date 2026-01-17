import { Button } from "./Button";

interface userProps {
	user:{
        id: number;
	fname: string;
	lname: string;
	email: string;
    } ;
}
export const User = ( {user} : userProps) => {
    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.fname[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.fname} {user.lname}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label="Send Money" onClick={()=>{}}></Button>

            </div>

        </div>
    )
    
};
