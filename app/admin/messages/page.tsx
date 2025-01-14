import ConversationDisplay from "./conversation/page";
import History from "./history/page";

export default function Messages() {
	return (
		<div className="flex gap-8 justify-center w-full h-full rounded-xl max-w-[84rem]">
			<History />
			<ConversationDisplay />
		</div>
	);
}