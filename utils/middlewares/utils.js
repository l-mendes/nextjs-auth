import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import baseUrl from '../baseUrl';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
  const parsedItems = { token: ''};
  if (req?.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */
export async function setLogout(e) {
  e.preventDefault();
  const res = await axios.post(`${baseUrl}/api/logout`, {
    headers:{
      "Content-Type":"application/json"
    },
  });

  if(!res.data.success) {
      console.log(res.data.message ?? res.data);
  } else {
    Router.push('/login');
  }
}

/**
 * 
 * @param {string} cookieName 
 */
export function destroyCookie(cookieName) {
  Cookies.remove(cookieName);
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}