import { DonatedItem } from "./DonatedItemInterface";
import { Organisation } from "./OrganisationInterface";

export type Order = {
  id: number;

  organisationId: number;
  donatedItemId: number;

  organisation: Organisation;
  donatedItem: DonatedItem;
  orderStatus: "pending" | "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";

  status: boolean;
  created_at: Date;
  updated_at: Date;
};
