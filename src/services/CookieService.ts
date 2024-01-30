import { useCookies } from "vue3-cookies";

class CookieService {

    public cookies: any;

    constructor() {
        const { cookies } = useCookies();
        this.cookies = cookies;
    }

    public rememberMe(username: string, password: string) {
        this.cookies.set('username', username);
        this.cookies.set('password', password);
    }

    public getRememberMe() {
        return {
            'username': this.cookies.get('username'),
            'password': this.cookies.get('password')
        };
    }
}

export default new CookieService();
