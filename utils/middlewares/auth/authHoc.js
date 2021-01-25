import React from 'react';
import {verifyToken, getAppCookies} from '../utils';
import baseUrl from '../../baseUrl';

const RequireAuthentication = (WrappedComponent) => {

    return class extends React.Component {

        static getInitialProps(ctx) {
            let isAuthenticated;
            const { token } = getAppCookies(ctx.req);

            if(!token) {
                ctx.res?.writeHead(302, {
                    Location: `${baseUrl}/login`
                });
                ctx.res?.end();
                return {};
            }

            isAuthenticated = verifyToken(token);

            if (isAuthenticated) {
                return WrappedComponent.getInitialProps(ctx);
            } else {
                ctx.res?.writeHead(302, {
                    Location: `${baseUrl}/login`
                });
                ctx.res?.end();
                return {};
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default RequireAuthentication;