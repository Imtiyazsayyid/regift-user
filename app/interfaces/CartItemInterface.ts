import { DonatedItem } from "./DonatedItemInterface";
import { Organisation } from "./OrganisationInterface";

export type CartItem = {
  id: number;

  organisationId: number;
  donatedItemId: number;

  organisation: Organisation;
  donatedItem: DonatedItem;

  status: boolean;
  created_at: Date;
  updated_at: Date;
};
