import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
  signIn: (jwt: string) => void;
  signOut: () => void;
  jwt?: string | null;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => null,
  jwt: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, jwt], setJwt] = useStorageState('jwt');

  return (
    <AuthContext.Provider
      value={{
        signIn: (test) => {
          // Perform sign-in logic here
          setJwt(test);
        },
        signOut: () => {
          setJwt(null);
        },
        jwt,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
