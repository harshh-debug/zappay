interface ButtonProps {
  label: string;
  onClick: () => void; 
  disabled:boolean
}

export function Button({label,onClick,disabled}:ButtonProps){
    return(
        <button disabled={disabled} onClick={onClick} type="button" className="text-white bg-slate-950 box-border border border-transparent shadow-xs font-medium   text-sm px-4 py-2.5 focus:outline-none mt-5 rounded-lg cursor-pointer mb-3  disabled:bg-slate-400
        disabled:cursor-not-allowed
        disabled:opacity-70">{label}</button>
    )
}