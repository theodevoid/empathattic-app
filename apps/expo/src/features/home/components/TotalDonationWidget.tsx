import { Box, Heading, Stack, Text, View } from "native-base";

import { toRupiah } from "~/utils/format";

export const TotalDonationWidget = () => {
  return (
    <Box position="relative">
      <View
        w="100%"
        h={45}
        bg="primary.100"
        position="absolute"
        top={0}
        zIndex={-100}
      />
      <Box h={90} bg="cyan.700" rounded="2xl" mx="8">
        <Stack
          position="relative"
          alignItems="center"
          justifyContent="center"
          py="4"
          h="100%"
        >
          <Text color="white" fontSize="xs">
            🎉 Your Total Donation
          </Text>
          <Heading color="white">{toRupiah(100000000)}</Heading>
          <Text color="white" fontSize="2xs">
            We appreciate all the kindness you&apos;ve done 😍
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
