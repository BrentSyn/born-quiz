import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCSDIENcJzGfuDfJ49dBddUGFv6xtu9z8s",
  authDomain: "quiz-dc3fd.firebaseapp.com",
  projectId: "quiz-dc3fd",
  storageBucket: "quiz-dc3fd.appspot.com",
  messagingSenderId: "163662146888",
  appId: "1:163662146888:web:946a047c3fe8ee19b4177d",
  measurementId: "G-B20GPFX0ZG"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const scoresCollection = db.collection('scores')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  scoresCollection
}