import { useState } from 'react';

import { Login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        await Login(email, password);
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