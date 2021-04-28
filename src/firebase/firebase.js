import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyC1lNE40HTWZ9Gjo6oHarQ3r1Nc4HwEdGc",
    authDomain: "find-a-friend-be968.firebaseapp.com",
    databaseURL: "https://find-a-friend-be968-default-rtdb.firebaseio.com",
    projectId: "find-a-friend-be968",
    storageBucket: "find-a-friend-be968.appspot.com",
    messagingSenderId: "67386736620",
    appId: "1:67386736620:web:1d8a8eb3361e26e5164ac9",
    measurementId: "G-0J2XWTJPV0"
};

app.initializeApp(firebaseConfig);

class Firebase{
    constructor(){
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();
        this.uploadFile('foo', 'dog.png',0, console.log);
    }
    debugError(error){
        alert(`${error.code} error has occurred - ${error.message}`);
    }
    writeDatabase(root, json){
        this.database.ref(root).set(json)
            .catch(this.debugError);
    }

    pushDatabase(root, json, callback){
        this.database.ref(root).push(json).then(ref=>callback(ref))
            .catch(this.debugError);
    }

    uploadFile(root, filename, data, callback){
        this.storage.ref(`${root}/${filename}`).put(data).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url=>callback(url));
        });
    }

    readDatabase(root, event, callback){
        this.database.ref(root).on(event, callback);
    }

    onUserActive(callback, fallback=null){
        this.auth.onAuthStateChanged((userInstance)=> {
            if(userInstance != null){
                callback(userInstance.uid);
            }
            else if(fallback != null){
                fallback();
            }
        });
    }
}

export default Firebase;
