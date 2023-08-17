import AuthProvider from "./Auth/AuthProvider";

export default function Store({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
