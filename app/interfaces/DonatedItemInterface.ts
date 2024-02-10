import { Category } from "./CategoryInterface";
import { Donor } from "./DonorInterface";

export type DonatedItem = {
  id: number;
  title: string;
  image: string;
  description: string | null;
  condition: "new" | "like_new" | "used_good" | "used_fair" | "used_poor";
  pickupAddress: string | null;

  approvalStatus: "pending" | "approved" | "rejected";

  isAvailable: boolean;
  isPickedUp: boolean;

  donorId: number;
  donor: Donor;

  categoryId: number;
  category: Category;

  status: boolean;
  created_at: Date;
  updated_at: Date;
};
