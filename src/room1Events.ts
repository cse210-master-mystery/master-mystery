export type Room1State = {
  pressure: number;
  lever1Clicks: number;
  progress: {
    pulledLever1: boolean;
    openedBook: boolean;
    openedKeypad: boolean;
    case1Melted: boolean;
    doorUnlocked: boolean;
  };
};

export type Room1Action =
  | { type: "LEVER1_CLICK"; pressureIncrease: number; target: number }
  | { type: "OPEN_BOOK" }
  | { type: "OPEN_KEYPAD" }
  | { type: "UNLOCK_DOOR" };

export function room1Events(state: Room1State, action: Room1Action): Room1State {
  switch (action.type) {
    case "LEVER1_CLICK": {
      const newPressure = state.pressure + action.pressureIncrease;

      const melted = newPressure >= action.target;

      return {
        ...state,
        pressure: melted ? action.target : newPressure,
        lever1Clicks: state.lever1Clicks + 1,
        progress: {
          ...state.progress,
          pulledLever1: true,
          case1Melted: melted || state.progress.case1Melted,
        },
      };
    }

    case "OPEN_BOOK":
      return {
        ...state,
        progress: { ...state.progress, openedBook: true },
      };

    case "OPEN_KEYPAD":
      return {
        ...state,
        progress: { ...state.progress, openedKeypad: true },
      };

    case "UNLOCK_DOOR":
      return {
        ...state,
        progress: { ...state.progress, doorUnlocked: true },
      };

    default:
      return state;
  }
}
