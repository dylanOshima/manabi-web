import { IconProps, StarIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { range } from "lodash";

const MAX_NUMBER_OF_STARS = 5;

type Props = {
  // Number between 0 and 100
  strength: number;
} & Pick<IconProps, "boxSize" | "color">;

/**
 * Render a star representation for the strength
 */
const Stars = ({ strength, boxSize, color }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const numFullStars = Math.floor(strength / 20);
  const numEmptyStars = MAX_NUMBER_OF_STARS - numFullStars;
  return (
    <>
      {range(0, numFullStars).map((index) => (
        <StarIcon
          key={index}
          color={color}
          boxSize={boxSize}
        />
      ))}
      {range(0, numEmptyStars).map((index) => (
        <StarIcon
          key={numFullStars + index}
          color={isDark ? "gray.600" : "gray.300"}
          boxSize={boxSize}
        />
      ))}
    </>
  );
};

export default Stars;
