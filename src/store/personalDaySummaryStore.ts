import { create } from 'zustand';

interface PersonalDaySummaryState {
  totalsByDate: Record<string, number>;
  setTotalForDate: (date: string, total: number) => void;
}

export const usePersonalDaySummaryStore = create<PersonalDaySummaryState>((set) => ({
  totalsByDate: {},
  setTotalForDate: (date, total) =>
    set((state) => ({
      totalsByDate: { ...state.totalsByDate, [date]: total }
    }))
}));

