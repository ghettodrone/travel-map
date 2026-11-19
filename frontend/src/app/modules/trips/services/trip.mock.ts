import { Trip } from '../../../resources/models/trip.model';

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Japan Adventure',
    description: 'Exploring Tokyo, Kyoto and Osaka',
    startDate: '2027-04-10T00:00:00.000Z',
    endDate: '2027-04-20T00:00:00.000Z',
    status: 'UPCOMING',
    userId: 'user-1',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Thailand Escape',
    description: 'A relaxing trip to Bangkok and Phuket',
    startDate: '2026-08-05T00:00:00.000Z',
    endDate: '2026-08-15T00:00:00.000Z',
    status: 'COMPLETED',
    userId: 'user-1',
    createdAt: '2026-07-01T10:00:00.000Z',
    updatedAt: '2026-08-15T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'Vietnam Discovery',
    description: 'Discovering the beauty of Vietnam',
    startDate: '2026-11-01T00:00:00.000Z',
    endDate: '2026-11-30T00:00:00.000Z',
    status: 'ONGOING',
    userId: 'user-1',
    createdAt: '2026-10-15T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
  },
];