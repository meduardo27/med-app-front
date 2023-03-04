import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon, ChatIcon } from "@chakra-ui/icons";
import Logo from "@/assets/logo-clinica.png";
import { TITLE_PAGE } from "@/utils/strings";

export default function Navbar() {
  return (
    <Box h="100px" bg="#10498f" color="white" padding={2}>
      <HStack mb={2}>
        <img width={40} src={Logo.src} />
        <Text fontSize="3xl">{TITLE_PAGE}</Text>
      </HStack>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <ArrowRightIcon /> Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/Sobre">
            <ChatIcon /> Sobre
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
