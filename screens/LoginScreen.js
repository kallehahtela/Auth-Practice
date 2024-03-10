import { useContext, useState } from 'react';

import { Login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { Alert } from 'react-native';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContent);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await Login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!');
        }
        
        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return (
            <LoadingOverlay message='Logging you in...'/>
        );
    }

    return (
        <AuthContent isLogin onAuthenticate={loginHandler} />
    );
}

export default LoginScreen;