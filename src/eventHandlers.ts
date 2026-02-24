type NavigatePayload = string;
type PopupPayload = { setState: (val: any) => void; value: any };

export function handleButtonEvent(
  eventType: string,
  payload: NavigatePayload | PopupPayload,
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
        typeof payload.setState === "function" &&
        typeof payload.value !== "undefined"
      ) {
        payload.setState(payload.value);
      }
      break;

    default:
      break;
  }
}
