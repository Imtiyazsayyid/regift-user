export type Organisation = {
  id: number;
  name: string;
  acronym: string | null;
  email: string;
  password: string;
  websiteUrl: string | null;
  logo: string | null;
  address: string;
  approvalStatus: "approved" | "pending" | "rejected";
  status: boolean;
  created_at: Date;
  updated_at: Date;
};
