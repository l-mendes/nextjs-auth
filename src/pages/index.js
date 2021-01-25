import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../ProTip';
import Link from '../Link';
import Copyright from '../Copyright';
import jwt from 'jsonwebtoken';
import { setLogout } from '../../utils/middlewares/utils'
import RequireAuthentication from '../../utils/middlewares/auth/authHoc';

async function handleOnClickLogout(e) {
  await setLogout(e);
}

const Index = (props) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-alpha example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <br/>
        <Link href="/logout" color="primary" onClick={e => handleOnClickLogout(e)}>
          Logout
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
};

Index.getInitialProps = async (ctx) => {
  return {};
}

export default RequireAuthentication(Index)
