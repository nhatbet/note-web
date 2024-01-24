class AuthService {
    public saveToLocalStorage(response: any): void {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
}

export default new AuthService();
