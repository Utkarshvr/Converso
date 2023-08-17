import RQProvider from "./RQProvider";
import Header from "@/components/Header/Header";
import OnBoarding from "@/components/OnBoarding/OnBoarding";
import Store from "@/context";

export default function App({ children }) {
  return (
    <RQProvider>
      <Store>
        <OnBoarding>
          <Header />
          {children}
        </OnBoarding>
      </Store>
    </RQProvider>
  );
}
