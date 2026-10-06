import { create } from 'zustand';

interface SharedDaySummaryState {
  totalsByGroupAndDate: Record<string, number>;
  setTotalForGroupAndDate: (groupId: string, date: string, total: number) => void;
}

const makeKey = (groupId: string, date: string) => `${groupId}:${date}`;

export const useSharedDaySummaryStore = create<SharedDaySummaryState>((set) => ({
  totalsByGroupAndDate: {},
  setTotalForGroupAndDate: (groupId, date, total) =>
    set((state) => ({
      totalsByGroupAndDate: {
        ...state.totalsByGroupAndDate,
        [makeKey(groupId, date)]: total
      }
    }))
}));

export function sumAllGroupTotals(totalsByGroupAndDate: Record<string, number>): number {
  return Object.values(totalsByGroupAndDate).reduce((sum, value) => sum + value, 0);
}

export function clearGroupTotal(groupId: string, date: string): string {
  return makeKey(groupId, date);
}

