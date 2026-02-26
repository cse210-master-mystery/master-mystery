type NavigatePayload = string;
type PopupPayload<T> = {
  setState: (val: T) => void;
  value: T;
};

export function handleButtonEvent<T>(
  eventType: string,
  payload: NavigatePayload | PopupPayload<T>,
  navigate?: (route: string) => void,
) {
  const popupPayload = payload as PopupPayload<T>;

  switch (eventType) {
    case "navigate":
      if (navigate && typeof payload === "string") {
        navigate(payload);
      }
      break;

    case "popup":
      if (
        popupPayload &&
        typeof popupPayload.setState === "function" &&
        typeof popupPayload.value !== "undefined"
      ) {
        popupPayload.setState(popupPayload.value);
      }
      break;

    default:
      // write error messge to console if event type is not recognized
      console.error(`Unhandled event type: ${eventType}`);
      break;
  }
}
