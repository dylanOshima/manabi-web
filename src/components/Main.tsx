import { Stack, StackProps } from '@chakra-ui/react'
import styles from './Main.module.css';

export const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="65rem"
    py="4rem"
    px="1rem"
    alignContent="flex-start"
    overflowY="scroll"
    className={styles.wrapper}
    {...props}
  />
)
