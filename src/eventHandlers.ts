import type { Room1Action } from "./room1events";

type NavigatePayload = string;

type PopupPayload<T> = {
  setState: (val: T) => void;
  value: T;
};

type GamePayload = {
  dispatch?: React.Dispatch<Room1Action>;
  action?: Room1Action;
};

export function handleButtonEvent<T>(
  eventType: string,
  payload: NavigatePayload | PopupPayload<T> | GamePayload,
  navigate?: (route: string) => void,
) {
  switch (eventType) {
    case "navigate":
      if (navigate && typeof payload === "string") {
        navigate(payload);
      }
      break;

    case "popup":
      const popupPayload = payload as PopupPayload<T>;
      if (popupPayload && typeof popupPayload.setState === "function") {
        popupPayload.setState(popupPayload.value);
      }
      break;

    case "room1":
      const gamePayload = payload as GamePayload;
      if (gamePayload.dispatch && gamePayload.action) {
        gamePayload.dispatch(gamePayload.action);
      }
      break;

    default:
      console.error(`Unhandled event type: ${eventType}`);
      break;
  }
}
