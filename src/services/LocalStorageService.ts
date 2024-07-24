class LocalStorageService {
    public saveAuthInfo(response: any): void {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }

    public clearAuthInfo(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }

    public getBearerToken(): string {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            return `Bearer ${accessToken}`;
        }

        return 'No Auth';
    }

    public getProfile() {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user)
        }

        return null;
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token')
    }
}

export default new LocalStorageService();
