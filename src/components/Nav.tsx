import { Box } from "@chakra-ui/react";
import { DarkModeSwitch } from "./nav/DarkModeSwitch";
import ProfileMenu from "./nav/ProfileMenu";

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
      <ProfileMenu />
      <DarkModeSwitch />
    </Box>
  );
}
