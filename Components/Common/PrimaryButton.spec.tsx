import { render, screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";

describe("PrimaryButton", () => {
  it("should render text exactly as it received by text prop", () => {
    const text = "Hello World!";
    render(
      <ThemeProvider theme={theme}>
        <PrimaryButton
          buttonType="default"
          size="m"
          text={text}
          onClick={() => {}}
        />
      </ThemeProvider>
    );
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
