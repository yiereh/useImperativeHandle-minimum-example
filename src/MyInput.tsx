import {
	type ComponentProps,
	type Ref,
	useImperativeHandle,
	useRef,
} from "react";

// Define custom methods you want to expose
export type CustomMethods = {
	focus: () => void;
	scrollIntoView: () => void;
};

type MyInputProps = {
	// define the ref props to be of type Ref<CustomMethods>,
	// i.e. ref that exposes(or defines) methods in CustomMethods
	ref?: Ref<CustomMethods>;
} & Omit<ComponentProps<"input">, "ref">;

export default function MyInput({ ref, ...props }: MyInputProps) {
	// define the actual ref which is to be
	// seen through the ref: Ref<CustomMethods> in MyInputProps.
	const inputRef = useRef<HTMLInputElement>(null);

	// You expose all the methods per CustomMethods using the actual ref
	// (i.e. inputRef in this case), so by using useImperativeHandle,
	// you effectively restrain(or expand) the methods originally
	// defined for the actual ref for the sake of API simplicity or
	// safety(you don't want others tinkering a part of your DOM).
	useImperativeHandle(ref, () => {
		return {
			focus() {
				inputRef.current?.focus();
			},
			scrollIntoView() {
				inputRef.current?.scrollIntoView();
			},
		};
	});

	return (
		<input
			className="border-1 border-stone-500 mx-2 px-1"
			{...(props as ComponentProps<"input">)}
			ref={inputRef}
		/>
	);
}
