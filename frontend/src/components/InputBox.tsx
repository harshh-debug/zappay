import type { ChangeEvent } from "react";

export function InputBox({label,placeholder,onChange}: {label: string,placeholder: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void}) {
	return (
		<div>
			<div className="text-sm font-medium text-left py-2 ">{label}</div>
			<input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200  focus:outline-none"/>
		</div>
	);
}
