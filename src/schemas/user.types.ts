import { Plan as subplan, Prisma } from "../../prisma/generated/main";

type Plan  = subplan

export interface Transaction {
  paymentId?: string | null;
  orderId: string;
  amount: number;
}

interface Subscription {
  plan: Plan;
  startDate?: Date | null;
  expiryDate?: Date | null;
  transaction?: Transaction | null;
}

interface WebBuild {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AutoWork {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkMan {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cognitoId?: string | null;
  verified: boolean;
  profileImage?: string | null;
  transactions?: Transaction[] | null;
  subscription?: Subscription | null;
  webBuild?: WebBuild | null;
  autoWork?: AutoWork | null;
  workMan?: WorkMan | null;
}
