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

