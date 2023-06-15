import type { ReactNode } from "react";

import { Container } from "./Container";
import { Main } from "./Main";
import Nav from "./Nav";

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
      <Nav />
    </Container>
  );
}
