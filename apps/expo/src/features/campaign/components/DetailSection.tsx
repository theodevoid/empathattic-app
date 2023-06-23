import { PropsWithChildren } from "react";
import { Box, Divider, Heading } from "native-base";

interface DetailSectionProps extends PropsWithChildren {
  title: string;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  children,
  title,
}) => {
  return (
    <Box mt="2">
      <Divider my="3" thickness={1.5} />
      <Heading size="md" mb="2">
        {title}
      </Heading>
      <Box bg="coolGray.200" p="2" rounded="md">
        {children}
      </Box>
    </Box>
  );
};
