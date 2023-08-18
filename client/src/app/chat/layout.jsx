import RequireAuth from "@/components/auth/RequireAuth";
import Contacts from "@/components/core/Contacts/Contacts";

export default function Layout({ children }) {
  return (
    <RequireAuth>
      <div
        className="container-xxl"
        style={{
          display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          gap: "0.5em",
          // background: "#121212",
          padding: "1em",
          height: "90vh",
        }}
      >
        <div style={{ width: "20%", minWidth: "120px" }}>
          <Contacts />
        </div>

        <div style={{ width: "75%", minWidth: "300px" }}>
          {children}
          {/* <Chat /> */}
        </div>
      </div>
    </RequireAuth>
  );
}
