export function handleButtonEvent(
  eventType: string,
  payload: any,
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
