import HeadPage from "@/components/HeadPage";
import { Box } from "@chakra-ui/react";

export default function Sobre() {
  return (
    <>
      <HeadPage title="Sobre - Clínica Médica Paraná" />
      <Box id="container" h="90vh" padding={2} bg="#3d6ab4" display="block">
        Clínica Médica Paraná
      </Box>
    </>
  );
}
