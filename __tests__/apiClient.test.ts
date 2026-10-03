import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../src/services/apiClient';

type Handler = { fulfilled: (config: any) => Promise<any> };
const requestHandler = (): Handler => (apiClient.interceptors.request as any).handlers[0];

beforeEach(() => AsyncStorage.clear());

describe('apiClient', () => {
  it('targets the backend with JSON headers', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:3000');
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('adds a bearer token when a session is stored', async () => {
    await AsyncStorage.setItem('expensify_auth', JSON.stringify({ token: 'abc' }));
    const config = await requestHandler().fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBe('Bearer abc');
  });

  it('sends no Authorization header when logged out', async () => {
    const config = await requestHandler().fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBeUndefined();
  });
});
