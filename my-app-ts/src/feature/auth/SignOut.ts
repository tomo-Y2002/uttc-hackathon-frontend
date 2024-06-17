import { FirebaseError } from '@firebase/util';
import { getAuth, signOut } from 'firebase/auth';

export const handleSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.error(e);
    }
  }
};
