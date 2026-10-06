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

export function sumAllPersonalTotals(totalsByDate: Record<string, number>): number {
  return Object.values(totalsByDate).reduce((sum, value) => sum + value, 0);
}

export const EMPTY_PERSONAL_SUMMARY: Record<string, number> = {};

