import { AuthRepository } from "@/core/application/ports/auth";
import { auth } from "@/lib/auth";
import { Result, ResultAsync } from "neverthrow";
import { cookies } from "next/headers";

export class BetterAuthRepository implements AuthRepository {
  async logIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<string, Error>> {
    return await ResultAsync.fromThrowable(async () => {
      const response = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        asResponse: true,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "Sign in failed");
      }

      // Forward Set-Cookie headers from Better Auth response to the browser
      const setCookieHeader = response.headers.getSetCookie();
      if (setCookieHeader) {
        const cookieStore = await cookies();
        for (const cookie of setCookieHeader) {
          const [nameValue, ...attributes] = cookie.split(";");
          const [name, ...valueParts] = nameValue.split("=");
          const value = valueParts.join("=");

          const cookieOptions: Record<string, string | boolean | Date> = {};
          for (const attr of attributes) {
            const [key, val] = attr.trim().split("=");
            const lowerKey = key.toLowerCase();
            if (lowerKey === "path") cookieOptions.path = val;
            else if (lowerKey === "httponly") cookieOptions.httpOnly = true;
            else if (lowerKey === "secure") cookieOptions.secure = true;
            else if (lowerKey === "samesite")
              cookieOptions.sameSite = val.toLowerCase() as
                | "lax"
                | "strict"
                | "none";
            else if (lowerKey === "max-age")
              cookieOptions.maxAge = parseInt(val, 10) as unknown as string;
            else if (lowerKey === "expires")
              cookieOptions.expires = new Date(val);
          }

          cookieStore.set(
            name.trim(),
            decodeURIComponent(value.trim()),
            cookieOptions,
          );
        }
      }

      const data = await response.json();
      return data.token;
    })()
      .map((data) => data.token)
      .mapErr((error) => {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error("Something went wrong while logging in");
        }
      });
  }
  async logOut(): Promise<Result<void, Error>> {
    return await ResultAsync.fromThrowable(
      async () => await auth.api.signOut(),
    )()
      .map(() => undefined)
      .mapErr((error) => {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error("Something went wrong while logging out");
        }
      });
  }
  async signUp({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<Result<string, Error>> {
    return await ResultAsync.fromThrowable(
      async () =>
        await auth.api.signUpEmail({
          body: {
            email,
            password,
            name,
          },
        }),
    )()
      .map((data) => data.token!)
      .mapErr((error) => {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error("Something went wrong while signing up");
        }
      });
  }
}
