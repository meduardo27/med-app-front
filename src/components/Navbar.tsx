import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Menu,
  MenuButton,
  Text,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box h="100px" bg="#10498f" color="white" padding={2}>
      <Text fontSize="3xl" paddingBottom={5}>
        Clínica Médica Paraná
      </Text>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/sobre">Sobre</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
