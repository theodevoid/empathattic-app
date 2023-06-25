import { Badge } from "native-base";

import { DonationStatus } from "@empathattic/db/schemas";

interface DonationCardBadgeProps {
  status: DonationStatus;
}

export const DonationCardBadge: React.FC<DonationCardBadgeProps> = ({
  status,
}) => {
  const styles = {
    [DonationStatus.AWAITING_PAYMENT]: {
      label: "Waiting for payment",
      color: "yellow",
    },
    [DonationStatus.FAIL]: {
      label: "Fail",
      color: "red",
    },
    [DonationStatus.SUCCESS]: {
      label: "Success",
      color: "green",
    },
  };

  return (
    <Badge
      bgColor={`${styles[status].color}.200`}
      _text={{
        color: `${styles[status].color}.800`,
        fontWeight: "bold",
      }}
      rounded="lg"
    >
      {styles[status].label}
    </Badge>
  );
};
