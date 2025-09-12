const APT_DOMAIN = "http://localhost:5000/" ;

export const get = async (path) => {
    const response = await fetch(APT_DOMAIN + path );
    const result = await response.json();
    return result ; 
}
