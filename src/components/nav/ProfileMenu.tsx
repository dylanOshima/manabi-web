import { loginPageURI } from "@/services/auth/loginLogout.details";
import { logoutFetch } from "@/services/auth/logout.fetch";
import {
  AtSignIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useStudent from "../hooks/useStudent";

type Props = {};

/*
 * Profile menu
 * @param props
 */
export default function ProfileMenu(props: Props) {
  const student = useStudent();

  const route = useRouter();
  const navigateTo = useCallback(
    (path: string) => () => route.push(path),
    [route],
  );

  const onLogout = useCallback(() => {
    logoutFetch().then(() => route.reload());
  }, [route]);

  if (student == null) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          colorScheme='green'
          onClick={navigateTo(loginPageURI)}>
          Login
        </MenuButton>
      </Menu>
    );
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            leftIcon={<AtSignIcon />}
            colorScheme='green'
            rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}>
            {student.firstName}
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={navigateTo("/course")}>Courses</MenuItem>
            <MenuItem
              color='red'
              fontWeight='bold'
              onClick={onLogout}>
              Log Out
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
