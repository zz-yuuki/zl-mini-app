import { useAtomValue } from "jotai";
import Badge from "./badge";
import { CartIcon } from "./vectors";
import { cartState, cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useRouteHandle } from "@/hooks";

function FloatingCartPreview() {
  const cart = useAtomValue(cartState);
  const { totalItems, totalAmount } = useAtomValue(cartTotalState);
  const [handle] = useRouteHandle();

  if (totalItems === 0 || handle?.noFloatingCart) {
    return <></>;
  }

  return (
    <TransitionLink
      to="/cart"
      className={`fixed left-4 right-4 ${
        handle?.noFooter ? "bottom-6" : "bottom-16"
      } mb-sb flex items-center space-x-2 text-left bg-primary text-primaryForeground px-4 py-2 rounded-lg`}
    >
      <Badge
        value={cart.length}
        style={{
          boxShadow: "none",
        }}
      >
        <CartIcon mono />
      </Badge>
      <span className="text-base font-medium flex-1">
        {formatPrice(totalAmount)}
      </span>
      <span className="text-sm">Đặt mua</span>
    </TransitionLink>
  );
}

export default FloatingCartPreview;
