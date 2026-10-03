import { usePersonalDaySummaryStore } from '../src/store/personalDaySummaryStore';
import { useSharedDaySummaryStore } from '../src/store/sharedDaySummaryStore';

describe('personal day summary store', () => {
  it('records totals per date without losing others', () => {
    usePersonalDaySummaryStore.setState({ totalsByDate: {} });
    usePersonalDaySummaryStore.getState().setTotalForDate('2026-10-01', 40);
    usePersonalDaySummaryStore.getState().setTotalForDate('2026-10-02', 15);
    usePersonalDaySummaryStore.getState().setTotalForDate('2026-10-01', 55);
    expect(usePersonalDaySummaryStore.getState().totalsByDate).toEqual({
      '2026-10-01': 55,
      '2026-10-02': 15
    });
  });
});

describe('shared day summary store', () => {
  it('exposes its state and setters', () => {
    const state = useSharedDaySummaryStore.getState();
    expect(state).toBeDefined();
    expect(Object.values(state).some((value) => typeof value === 'function')).toBe(true);
  });
});
