'use server'
import axios from 'axios';
import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { DeTokenizeUrl, authUrl, secretKey, validateUrl } from './store';
/**
 * An authentication context or service that handles user authentication and 
 * role-based authorization
*/

const key = new TextEncoder().encode(secretKey);

export async function getRole() {
  const session = await getSession();
  let userRole = '';
  const roles = ['MANAGER', 'REGISTRATION_OFFICER', 'SNR_REGISTRATION_OFFICER', , 'DIRECTOR', 'REGISTRAR', 'LICENSE_OFFICER', 'SNR_LICENSE_OFFICER', 'LICENSE_MANAGER', 'ADMIN'];
  
  if(!session?.user?.realm_access){
      redirect('/welcome');
  }
  for(const role of session?.user?.realm_access?.roles || []){
      if(roles.includes(role)){
          userRole = await role;
          break;
      }
  }
  return userRole;
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("3600 sec from now")
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }
  export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
        const res = await login(formData)
    } catch (error) {
      if (error) {
        switch (error) {
          case 'CredentialsSignin':
            return 'Invalid credentials.'
          default:
            return 'Something went wrong.'
        }
      }
      throw error
    }
    return redirect('/trls/home');
  }
export async function experiment(formData: FormData){
  const res = await login(formData)

  return res
}
export async function login(formData: FormData) {

    const payload = {
        username: formData.get('username'),
        password: formData.get('password')
    }
    try{
        const res = await fetch(`${authUrl}login/`,{
            method: 'POST',
            cache:'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({...payload}),
        })
        return res.json()
    } catch(error){
      if (isRedirectError(error)) {
        throw error;
        }
      throw error
    }
  }
  export async function validateOTP(username: string, otp: string) {
    const payload = {
        username: username,
        otp: otp
    }
    try{
        const res = await fetch(`${validateUrl}`,{
            method: 'POST',
            cache:'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({...payload}),
        })
        return res.json()
    } catch(error){
      throw error
    }
  }
export async function DeTokenize(access_token: string){
  let success = false
  try{
    const res = await fetch(`${DeTokenizeUrl}${access_token}`, 
      {
        method: 'POST',
        cache:'no-cache',
        headers: {
          'Content-Type': 'application/json'
      },
      }
    )
    if(res.ok){
      const user = await res.json()

      // Create the session
      const expires = new Date(Date.now() + 3600 * 1000);
      const session = await encrypt({ user, expires });

      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
    } else {
      return await res.json();
    }
  } catch(error){
    throw error
  }finally{
    if(success){
      redirect('/trls/home')
    }
  }
}
export async function logout() {
    // Destroy the session
    revalidatePath('/trls/home')
    cookies().set("session", "", { expires: new Date(0) });
}
  
export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 3600 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }

export const register = async (username:string, password:string, roles:[]) => {
    try{
        const response = await axios.post(`${authUrl}/register/`, { username, password, roles });

        return response.data;
    } catch(error){
        throw error;
    }
}

const setAuthCookie = (authData: any) => {
    const {access, refresh} = authData;
}

/**
 * Authorized API request from the app to the backend app, include the JWT
 * token in the Authorization header
*/
const authAxios = axios.create({
    baseURL: authUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests
})