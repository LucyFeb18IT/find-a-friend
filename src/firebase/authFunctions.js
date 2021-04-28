import Firebase from './firebase';

class AuthFunctions extends Firebase{
    signUp(firstname, lastname, email, pwd){
        //Create a user on firebase
        //Write the user's information into the database
        //Catch any errors thrown by firebase
        this.auth.createUserWithEmailAndPassword(email,pwd)
            .then((userCred)=>{
                this.writeDatabase(userCred.user.uid,{
                    name: {
                        first :firstname,
                        last: lastname
                    },
                    email: email,
                    profile_pic:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
                    posts:{},
                    following:{
                        [userCred.user.uid]:0
                    }           
                });
            })
            .catch(this.debugError);
    }
    logIn(email, pwd){
        //log the user in to Firebase
        //Catch any errors thrown
        this.auth.signInWithEmailAndPassword(email,pwd)
            .catch(this.debugError);
    }
    logOut(callback){
        this.auth.signOut()
            .then(callback)
            .catch(this.debugError);
    }
}

const authFunctions = new AuthFunctions();
export default authFunctions;