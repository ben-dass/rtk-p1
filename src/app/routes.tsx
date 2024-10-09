import { createBrowserRouter } from "react-router-dom";
import App from "@src/App.tsx";
import Counter from "@features/Counter/Counter.tsx";
import NotFound from "@features/NotFound.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{
						index: true,
						element: <Counter />,
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
