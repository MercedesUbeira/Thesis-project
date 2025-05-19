// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyATPzBJcIUAvbLJGNE6NuB59Dpr9VNhcIo",
  authDomain: "knowledgebase-articles.firebaseapp.com",
  databaseURL: "https://knowledgebase-articles-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "knowledgebase-articles",
  storageBucket: "knowledgebase-articles.appspot.com",
  messagingSenderId: "969710144763",
  appId: "1:969710144763:web:525023e27dea1503fbf45e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
