import TopNav from "@src/components/TopNav.tsx";
import Content from "@src/components/Content.tsx";

const App = () => {
	return (
		<div className="flex h-screen w-screen justify-center">
			<div className="w-[50rem]">
				<div className="mt-10 flex flex-col items-center justify-center gap-5">
					<TopNav />
					<Content />
				</div>
			</div>
		</div>
	);
};

export default App;
