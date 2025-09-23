
'use server';
import { config } from 'dotenv';
config();

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { redirect } from 'next/navigation';

export async function loginAction(
  previousState: { error: string | null },
  formData: FormData
) {
  if (!auth || !db) {
    return { error: 'Firebase is not configured correctly. Please add your Firebase project credentials to the .env file.' };
  }
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    if (e.code) {
      switch (e.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return { error: 'Invalid email or password.' };
        default:
          console.error('Firebase Auth Error:', e);
          return { error: 'An unknown error occurred. Please try again.' };
      }
    }
    console.error('Unknown Login Error:', e);
    return { error: 'An unknown error occurred. Please try again.' };
  }
  
  const user = userCredential.user;
  if (!user.emailVerified) {
    return { error: 'Please verify your email before logging in. Check your inbox for a verification link.' };
  }

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      // This case handles users that are in auth but not in firestore
      await user.delete(); // Clean up auth user
      return { error: "Login failed: User profile not found." };
    }
  } catch(e) {
    console.error("Firestore Error during login:", e)
    return { error: "An error occurred while verifying your profile." }
  }


  redirect('/?loggedin=true');
}

type RegisterState = {
  error: string | null;
  success: boolean;
};

export async function registerAction(
  previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  if (!auth || !db) {
    return { error: 'Firebase is not configured correctly. Please add your Firebase project credentials to the .env file.', success: false };
  }
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return { error: 'All fields are required.', success: false };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.', success: false };
  }
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
      return { error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.', success: false };
  }


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
        await sendEmailVerification(user);
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            createdAt: new Date(),
        });
    } catch (e) {
        // If sending email or writing to DB fails, delete the auth user
        console.error("Verification/DB Error:", e);
        // This makes the registration idempotent
        await deleteUser(user).catch(delErr => console.error("Failed to cleanup user:", delErr));
        return { error: "Failed to send verification email or save profile. Please try again.", success: false }
    }
  } catch (e: any) {
    if (e.code) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          return { error: 'This email is already registered.', success: false };
        case 'auth/invalid-email':
          return { error: 'Please enter a valid email address.', success: false };
        case 'auth/weak-password':
          return { error: 'Password is too weak. Please choose a stronger one.', success: false };
        default:
          console.error('Firebase Auth Error:', e);
          return { error: 'An unknown error occurred during registration.', success: false };
      }
    }
     console.error('Unknown Registration Creation Error:', e);
     return { error: 'An unknown error occurred. Please try again.', success: false };
  }
  
  return { error: null, success: true };
}
