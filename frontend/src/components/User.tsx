import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface userProps {
    user: {
        id: number;
        fname: string;
        lname: string;
        email: string;
    };
}

export const User = ({ user }: userProps) => {
    const navigate=useNavigate()
    return (
        <div className="flex justify-between p-2">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4">
                    <div className="text-xl">
                        {user.fname[0].toUpperCase()}
                    </div>
                </div>
                <div className="text-lg font-medium">
                    {user.fname} {user.lname}
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <Button disabled={false} label="Send Money" onClick={() => {navigate("/send?id="+ user.id + "&name="+ user.fname)}} />
            </div>
        </div>
    );
};
