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
        }).then(() => {
          dispatch(setUser({
            userName: user.displayName,
            email: user.email,
            token: user.accessToken,
            id: user.uid,
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