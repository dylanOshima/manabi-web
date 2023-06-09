import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      mx={2}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label='Toggle Theme'
      colorScheme='green'
      onClick={toggleColorMode}
    />
  );
};
