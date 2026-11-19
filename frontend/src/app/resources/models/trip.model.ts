export type TripStatus =
  | 'PLANNING'
  | 'UPCOMING'
  | 'ONGOING'
  | 'COMPLETED';

export interface Trip {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  status: TripStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}