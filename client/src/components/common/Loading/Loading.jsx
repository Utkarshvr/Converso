import Backdrop from "@/components/common/Backdrop/Backdrop";
import Spinner from "@/components/common/Spinner/Spinner";

export default function Loading() {
  return (
    <Backdrop>
      <Spinner />
    </Backdrop>
  );
}
