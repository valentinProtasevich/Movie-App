import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../components/store/slices/userSlice';

function useRegistrationWithEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return function(data) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({user}) => {
        updateProfile(auth.currentUser, {
          displayName: data.fullName, 
          //photoURL: "https://firebasestorage.googleapis.com/v0/b/astronews-83226.appspot.com/o/avatar.svg?alt=media&token=cf180e62-134d-4d33-94a4-020b1c57806d"
        }).then(() => {
          dispatch(setUser({
            userName: user.displayName,
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            //userPhotoUrl: user.photoURL,
            provider: 'email',
          }));
          navigate('/');
        }).catch((error) => {

        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          alert('Ошибка. Пользователь с таким email адресом уже зарегестрирован.');
        };
      });
  }
};

export default useRegistrationWithEmail;