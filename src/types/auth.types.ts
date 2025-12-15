export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  token: string;
  role: string;
  activeStatus?: string;
}

export interface ApiKey {
  id: string;
  storeId?: string;
  userId?: string;
  metaToken?: string;
  metaAccountId?: string;
  shopifyToken?: string;
  shopifyUrl?: string;
  verified?: boolean;
  status?: string;
  storeName?: string;
  syncId?: string;
}

export interface SyncProcess {
  id: string;
  userId?: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  metaDataSynced?: boolean;
  shopifyDataSynced?: boolean;
  startedAt: string;
  completedAt?: string | null;
  error?: string | null;
  progress?: number;
  logs?: string[];
}
