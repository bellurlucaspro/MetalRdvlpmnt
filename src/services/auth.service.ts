import api from './api.service';
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: string;
    email: string;
    role: string;
    lastLogin?: string;
}

interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
}

export const authService = {
    // Login user
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Logout user
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
    },

    // Get current user from local storage
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decoded: any = jwtDecode(token);
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                this.logout();
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    // Initialize admin (one-time setup)
    async initAdmin() {
        return api.post('/auth/init');
    }
};
