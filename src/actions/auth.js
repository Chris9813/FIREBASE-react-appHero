import Swal from "sweetalert2"
import {firebase, googleAuthProvider} from "../firebase/firebase-config"
import { types } from "../types/types"


export const startLoginEmailPaswword = (email, password) => {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            console.log(user);
            dispatch(login(user.uid, user.displayName))
        }).catch(e => {
            console.log(e);
            Swal.fire("Error", e.message, "error")
        })
        
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( userCred =>  {
                console.log(userCred);
            })
    }
}


export const login = (uid, displayname) => ({
    type: types.login,
    payload: {
        uid,
        displayname,
    }
})

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})


