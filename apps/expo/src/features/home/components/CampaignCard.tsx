import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
} from "native-base";

import { toRupiah } from "~/utils/format";

export const CampaignCard = () => {
  return (
    <Box shadow="1" bg="white" borderRadius="xl">
      <AspectRatio ratio={16 / 9} width="100%">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          }}
          alt="campaign"
          borderTopRightRadius="xl"
          borderTopLeftRadius="xl"
        />
      </AspectRatio>
      <Box p="2" pb="4">
        <Stack space="2" mt="2">
          <Heading size="sm">Beasiswa Penerus Bangsa</Heading>
          <Stack space="1">
            <Progress value={75} />
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" color="green.700">
                {toRupiah(1000000)}
              </Text>
              <Text fontWeight="bold" color="blueGray.500">
                75%
              </Text>
            </HStack>
          </Stack>
        </Stack>
        <Button rounded="xl" mt="6">
          Donate
        </Button>
      </Box>
    </Box>
  );
};
