import ChatClientForm from "../client/chatClientForm";

export default function ChatFooter() {
  return (
    <div className="absolute w-full bottom-0 h-20 lg:h-14 bg-white flex items-center gap-5">
      <div className="hidden lg:flex w-full lg:w-[40%]"></div>
      <div className="grow">
        <ChatClientForm/>
      </div>
    </div>
  );
}
