declare module '#auth-utils' {
  interface UserSession {
    user: {
      github?: any;
    };
    loggedInAt: number;
  }
}

export {};
