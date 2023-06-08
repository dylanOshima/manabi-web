import type { ReactNode } from "react";

import { Container } from "./Container";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Main } from "./Main";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

/**
 * Wrapper for page components to enforce a consistent layout.
 */
export default function Page({ children, header, footer }: Props) {
  return (
    <Container height='100vh'>
      {header}
      <Main>{children}</Main>
      {footer}
      <DarkModeSwitch />
    </Container>
  );
}
