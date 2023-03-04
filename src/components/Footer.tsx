import { TEXT_FOOTER } from "@/utils/strings";
import { Box, Center } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box>
      <Center bg="#10498f" w="100%" h="100px" color="white">
        {TEXT_FOOTER}
      </Center>
    </Box>
  );
}
