/// <reference types="vite/client" />
interface Window {
    ethereum: any
}
export interface Charities {
    charities: Charity[];
  }
  
export interface Charity {
    address: string;
    name: string;
    description: string;
  }