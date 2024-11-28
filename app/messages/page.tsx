import ConversationDisplay from "./conversation/page";
import History from "./history/page";

export default function Messages() {
  return (
    <div className="flex gap-8 w-full h-full rounded-xl">
      <History />
      <ConversationDisplay />
    </div>
  );
}
