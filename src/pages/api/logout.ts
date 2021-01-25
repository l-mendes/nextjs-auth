import { NextApiRequest, NextApiResponse } from 'next';
import { getAppCookies } from '../../../utils/middlewares/utils';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    const { token } = getAppCookies(req);

    if(!token) {
      res.status(401).json({success: false, message: "Not Allowed"});
    }

    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({success: false, message: `Method ${method} Not Allowed`});
    }

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1,
      path: '/'
    }));

    res.status(201).json({success: true});

  } catch (err) {
    res.status(500).json({success: false, message: err.message })
  }
}

export default handler;