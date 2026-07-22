import create from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    error: '',
    login: async (email, password) => {
        try {
            // Call your API to login
            const response = await fetch('YOUR_API_ENDPOINT/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                set({ user: data.user, error: '' });
            } else {
                set({ error: data.message });
            }
        } catch (error) {
            set({ error: 'Login failed. Please try again.' });
        }
    },
}));

export const useStore = () => useAuthStore;