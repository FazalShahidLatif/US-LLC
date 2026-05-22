export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'formation' | 'compliance' | 'ip' | 'personal';
  basePrice: number;
  features: string[];
  benefits: string[];
  processSteps: string[];
}

export interface StateFee {
  state: string;
  code: string;
  fee: number;
  processingDays: number;
}

export interface MediaConfig {
  type: 'image' | 'youtube' | 'custom_url';
  url: string;
  title: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export type UserRole = 'admin' | 'staff' | 'user';

export interface AuthSession {
  token: string;
  email: string;
  role: UserRole;
  name: string;
}

