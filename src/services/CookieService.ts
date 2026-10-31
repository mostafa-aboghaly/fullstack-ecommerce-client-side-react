import Cookies, {
  type CookieGetOptions,
  type CookieSetOptions,
} from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  get(key: string, options?: CookieGetOptions) {
    return cookies.get(key, options);
  }
  set(key: string, value: string, options?: CookieSetOptions) {
    return cookies.set(key, value, { path: "/", ...options });
  }
  remove(key: string, options?: CookieSetOptions) {
    return cookies.remove(key, { path: "/", ...options });
  }
}

export default new CookieService();
