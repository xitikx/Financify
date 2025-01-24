import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore'; // Firestore imports

const firebaseConfig = {
    apiKey: "AIzaSyCUd1sfY6PEGRt3h5U3562w7OeNlWU6DlQ",
    authDomain: "expense-tracker-d48da.firebaseapp.com",
    projectId: "expense-tracker-d48da",
    storageBucket: "expense-tracker-d48da.firebasestorage.app",
    messagingSenderId: "948532090003",
    appId: "1:948532090003:web:5c86c9cb206acc7f2e6966",
    measurementId: "G-2JY9JMKR1Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance

// Function to create a user and store data
const createUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      financialData: {
        income: 0,
        expenses: 0,
        savings: 0,
      },
    });

    console.log('User created and data stored!');
  } catch (error) {
    console.error('Error creating user: ', error.message);
  }
};

export { auth, db, createUser, signInWithEmailAndPassword };
