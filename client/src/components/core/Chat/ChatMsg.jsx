// Date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const msgStyle = {
  width: "fit-content",
  maxWidth: "45%",
  borderRadius: "0.4em",
  padding: "0.5em",
  //   background: "#005c4b",  // Whatsapp green
  background: "#102b53",
  wordWrap: "break-word",
};

export default function ChatMsg({ me, message }) {
  const isMyMsg = message.sender === me._id;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMyMsg ? "flex-end" : "flex-start",
      }}
    >
      <div
        className={`${isMyMsg ? "bg-primary-subtle" : "bg-secondary-subtle"}`}
        style={{
          ...msgStyle,
          display: "flex",
          flexDirection: "column",
          justifyContent: isMyMsg ? "flex-end" : "flex-start",
        }}
      >
        <p
          style={{
            marginBottom: "0.2em",
          }}
        >
          {message.message}
        </p>
        <div
          style={{
            fontWeight: "bold",
            color: "#d0d0d0",
            fontSize: "10px",
            marginLeft: isMyMsg ? "auto" : 0,
            marginRight: !isMyMsg ? "auto" : 0,
          }}
        >
          {formatDistanceToNow(new Date(message?.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
}
