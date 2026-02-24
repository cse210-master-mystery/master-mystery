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
  switch (eventType) {
    case "navigate":
      if (navigate && typeof payload === "string") {
        navigate(payload);
      }
      break;

    case "popup":
      if (
        payload &&
        typeof (payload as PopupPayload<T>).setState === "function" &&
        typeof (payload as PopupPayload<T>).value !== "undefined"
      ) {
        (payload as PopupPayload<T>).setState((payload as PopupPayload<T>).value);
      }
      break;

    default:
      break;
  }
}
