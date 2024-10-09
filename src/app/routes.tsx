import { createBrowserRouter } from "react-router-dom";
import App from "@src/App.tsx";
import NotFound from "@features/NotFound.tsx";
import TodoList from "@features/todos/TodoList.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{
						index: true,
						element: <TodoList />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;
