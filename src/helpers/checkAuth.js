import { getData } from "./axios";

export const checkAuthentication = async () => {

    const accessToken = localStorage.getItem('access_token');
    const result = {
        authenticated : false,
        isAdmin : false
    }

    // try {
    if (accessToken) {
        const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
        console.log(tokenParts)
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(now)
        if (tokenParts.exp > now) {
            result.authenticated = true;
            const userdata = await getData(`user/is_admin/${tokenParts.user_id}/`)
            
            console.log(userdata)
            result.isAdmin = userdata.is_admin;
            console.log(result)
            return result
            
        } else {
            throw new Error(`Expired token`);
        }
    } else {
        throw new Error(`Auth Token not found`);
    }
    // } catch (error) {
    //     console.error("Error checking for authentication", error);
    //     throw error;
    // }
}