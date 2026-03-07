import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuButton from "../buttons/MenuButton";
import GameMenuContent from "./GameMenuContent";

describe("GameMenuContent", () => {
  it("renders menu title and Back button when menu is open", async () => {
    const user = userEvent.setup();

    render(
      <MenuButton>
        <GameMenuContent />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByRole("heading", { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to game/i })).toBeInTheDocument();
  });

  it("renders Return to Home when onReturnHome is provided", async () => {
    const user = userEvent.setup();
    const onReturnHome = vi.fn();

    render(
      <MenuButton>
        <GameMenuContent onReturnHome={onReturnHome} />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByRole("button", { name: /return to home page/i })).toBeInTheDocument();
  });

  it("does not render Return to Home when onReturnHome is not provided", async () => {
    const user = userEvent.setup();

    render(
      <MenuButton>
        <GameMenuContent />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.queryByRole("button", { name: /return to home page/i })).not.toBeInTheDocument();
  });

  it("closes the modal when Back is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MenuButton>
        <GameMenuContent />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("heading", { name: /menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back to game/i }));
    expect(screen.queryByRole("heading", { name: /menu/i })).not.toBeInTheDocument();
  });

  it("calls onReturnHome and closes the modal when Return to Home is clicked", async () => {
    const user = userEvent.setup();
    const onReturnHome = vi.fn();

    render(
      <MenuButton>
        <GameMenuContent onReturnHome={onReturnHome} />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /return to home page/i }));

    expect(onReturnHome).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("heading", { name: /menu/i })).not.toBeInTheDocument();
  });

  it("menu modal does not show the × close button", async () => {
    const user = userEvent.setup();

    render(
      <MenuButton>
        <GameMenuContent />
      </MenuButton>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });
});
