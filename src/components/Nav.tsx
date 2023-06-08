import { Box } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";

type Props = {};

/*
 * Description of function
 * @param props
 */
export default function Nav(props: Props) {
  return (
    <Box
      position='fixed'
      top={4}
      right={4}>
      <DarkModeSwitch />
    </Box>
  );
}
