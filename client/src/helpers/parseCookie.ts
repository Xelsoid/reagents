const parseCookie = (): { [key: string]: string } => {
  const cookieRawArr = document.cookie.split('; ');
  return Object.fromEntries(cookieRawArr.map((cookie) => cookie.split('=')));
};

export const getCookieValue = (cookieName: string): string | undefined => {
  const cookieArr = parseCookie();

  return cookieArr[cookieName];
};

export const isCookieExist = (cookieName: string) => {
  const cookieArr = parseCookie();

  return cookieArr[cookieName] !== undefined;
};
