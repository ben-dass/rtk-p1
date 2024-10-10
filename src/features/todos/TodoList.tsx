import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { Button } from "@components/ui/button.tsx";
import {
	useAddTodoMutation,
	useDeleteTodoMutation,
	useGetTodosQuery,
	useUpdateTodoMutation,
} from "@src/api/apiSlice.ts";
import { FaRegTrashAlt } from "react-icons/fa";

export interface ITodo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const formSchema = z.object({
	todoItem: z.string().min(2).max(50),
});

const TodoList = () => {
	const {
		data: todos,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTodosQuery({});
	const [addTodo] = useAddTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			todoItem: "",
		},
	});

	const onSubmit = () => {
		addTodo({
			userId: 1,
			title: form.getValues().todoItem,
			completed: false,
		});
		form.reset();
	};

	const newTodoSection = (
		<div className="w-full">
			<div className="w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex items-center justify-center gap-5"
					>
						<FormField
							name={"todoItem"}
							control={form.control}
							render={({ field }) => (
								<FormItem className={"w-[20rem]"}>
									<FormControl>
										<Input
											placeholder={"Buy groceries"}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type={"submit"}>+</Button>
					</form>
				</Form>
			</div>
		</div>
	);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<div className="mb-5 mt-5 rounded-xl border border-gray-200">
				{todos.map((todo: ITodo) => {
					return (
						<div
							key={todo.id}
							className="group flex items-center justify-between p-2 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-100"
						>
							<span
								className={`${todo.completed ? "text-gray-400" : "text-black"} flex flex-row transition-all duration-300 ease-in-out group-hover:text-black`}
							>
								{todo.title}
							</span>
							&nbsp;
							<span className="flex flex-row gap-3">
								<span
									className="ml-2 hidden items-center justify-center group-hover:flex"
									onClick={() => deleteTodo(todo.id)}
								>
									<FaRegTrashAlt />
								</span>
								<span
									className={`rounded p-1 text-xs font-bold uppercase opacity-50 outline outline-[0.11rem] group-hover:opacity-100 ${todo.completed ? "text-green-700" : "text-red-700"} transition-all duration-300 ease-in-out`}
									onClick={() =>
										updateTodo({
											...todo,
											completed: !todo.completed,
										})
									}
								>
									{todo.completed
										? "completed"
										: "incomplete"}
								</span>
							</span>
						</div>
					);
				})}
			</div>
		);
	} else if (isError) {
		console.log(error);
		content = <p>Error</p>;
	}

	return (
		<div>
			{newTodoSection}
			{content}
		</div>
	);
};

export default TodoList;
