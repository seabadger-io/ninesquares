import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAuouvPnJfM1YYb5iHDdsDvslxKgrFaEik',
  authDomain: 'ninesquares.seabadger.io',
  databaseURL: 'https://seabadger-ninesquares.firebaseio.com',
  projectId: 'seabadger-io',
  storageBucket: 'seabadger-io.appspot.com',
  messagingSenderId: "95903405286"
};
firebase.initializeApp(config);

export default firebase.database();
