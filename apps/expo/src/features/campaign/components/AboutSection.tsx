import { useState } from "react";
import { Pressable, Text } from "native-base";

import { DetailSection } from "./DetailSection";

interface AboutSectionProps {
  description: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ description }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <DetailSection title="About Campaign">
      <Text numberOfLines={showMore ? 0 : 3}>{description}</Text>
      <Pressable
        onPress={() => setShowMore((prev) => !prev)}
        _pressed={{ opacity: 0.6 }}
        mt="0.5"
      >
        <Text fontWeight="semibold">{showMore ? "Show less" : "See more"}</Text>
      </Pressable>
    </DetailSection>
  );
};
