// @ts-nocheck

const parseCookie = () => {
  const cookieRawArr = document.cookie.split('; ');
  return Object.fromEntries(
    cookieRawArr.map((cookie) => {
      return cookie.split('=');
    })
  );
};

export const getCookieValue = (cookieName) => {
  const cookieArr = parseCookie();

  return cookieArr[cookieName];
};

export const isCookieExist = (cookieName) => {
  const cookieArr = parseCookie();

  return cookieArr[cookieName] !== undefined;
};
