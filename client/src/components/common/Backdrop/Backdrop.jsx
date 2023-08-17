const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000000,
};

const Backdrop = ({ children }) => {
  return <div style={backdropStyle}>{children}</div>;
};

export default Backdrop;
