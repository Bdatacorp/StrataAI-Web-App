import { message, MessageRoles } from "@/components/modules/chat/types";

export default function ChatMessage({ text, role }: message) {
  return (
    <div className="w-full">
      {role === MessageRoles.Assistant ? (
        <div className="bg-white p-5 rounded">{text}</div>
      ) : (
        <div className="bg-primary p-5 text-white rounded w-auto">{text}</div>
      )}
    </div>
  );
}
