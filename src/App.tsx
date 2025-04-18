import { useRef } from "react";
import type { CustomMethods } from "./MyInput";
import MyInput from "./MyInput";

export default function App() {
	const ref = useRef<CustomMethods>(null);

	function handleClick() {
		ref.current?.focus();
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<form>
					<MyInput placeholder="Enter your name" ref={ref} />
					<button
						className="border-2 border-black"
						type="button"
						onClick={handleClick}
					>
						Edit
					</button>
				</form>
			</div>
		</>
	);
}
