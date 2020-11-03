import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBBxmN64wcMYDllHdRh4p94x9MmezpSf08",
        authDomain: "my-schedule-b17d4.firebaseapp.com",
        databaseURL: "https://my-schedule-b17d4.firebaseio.com",
        projectId: "my-schedule-b17d4",
        storageBucket: "my-schedule-b17d4.appspot.com",
        messagingSenderId: "1050280145439",
        appId: "1:1050280145439:web:cd38c8a204d031a27fdb2a",
        measurementId: "G-F9ZD63P59Z"
};

Firebase.initializeApp(config);
export const database = Firebase.database()

export const auth = Firebase.auth();
const provider = new Firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth.signInWithRedirect(provider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export default Firebase;