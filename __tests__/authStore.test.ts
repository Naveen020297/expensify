import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../src/store/authStore';

const user = { id: '1', email: 'a@b.co', username: 'ab', name: 'A B' };

beforeEach(async () => {
  await AsyncStorage.clear();
  useAuthStore.setState({ user: null, token: null, isAuthenticated: false, hasHydrated: false });
});

describe('authStore', () => {
  it('setAuth stores the session in state and storage', async () => {
    await useAuthStore.getState().setAuth({ user, token: 't0k' });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(JSON.parse((await AsyncStorage.getItem('expensify_auth')) as string)).toEqual({ user, token: 't0k' });
  });

  it('logout clears state and storage', async () => {
    await useAuthStore.getState().setAuth({ user, token: 't0k' });
    await useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(await AsyncStorage.getItem('expensify_auth')).toBeNull();
  });

  it('hydrate restores a saved session', async () => {
    await AsyncStorage.setItem('expensify_auth', JSON.stringify({ user, token: 'saved' }));
    await useAuthStore.getState().hydrate();
    const state = useAuthStore.getState();
    expect(state.token).toBe('saved');
    expect(state.isAuthenticated).toBe(true);
    expect(state.hasHydrated).toBe(true);
  });

  it('hydrate with nothing stored still marks hydrated', async () => {
    await useAuthStore.getState().hydrate();
    expect(useAuthStore.getState().hasHydrated).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('hydrate survives corrupt storage', async () => {
    await AsyncStorage.setItem('expensify_auth', '{not json');
    await useAuthStore.getState().hydrate();
    expect(useAuthStore.getState().hasHydrated).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
