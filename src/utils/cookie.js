export const setCookie = (name, value, domain, maxAge = 2592000, path = "/", secure = true, samesite = null) => {
    const domainAttribute = domain ? `;domain=${domain}` : "";
    document.cookie = `${name}=${value}${domainAttribute};Max-Age=${maxAge};path=${path};secure=${secure};${
        samesite ? `samesite=${samesite}` : ""
    }`;
};

export const getCookie = cname => {
    const name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    const numCookies = cookies.length;
    for (let i = 0; i < numCookies; i++) {
        let c = cookies[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
};

export const deleteCookie = (cname, path, domain) => {
    if (getCookie(cname)) {
        const pathString = path ? `;path=${path}` : "";
        document.cookie = `${cname}= ;expires = Thu, 01 Jan 1970 00:00:01 GMT${pathString}`;
    }
};
