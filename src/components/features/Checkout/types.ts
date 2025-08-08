export interface Membership {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  chatCredits: number;
  priority: boolean;
  verificationSupport: boolean;
  color: string;
}
