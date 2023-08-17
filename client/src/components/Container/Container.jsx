export default function Container({ centered, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: centered ? "center" : null,
        justifyContent: centered ? "center" : null,
      }}
    >
      {children}
    </div>
  );
}
