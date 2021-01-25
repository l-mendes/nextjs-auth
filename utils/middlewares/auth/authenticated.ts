import { verify } from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest,  res: NextApiResponse ) => {
  const secret = process.env.JWT_SECRET || '';
  verify(req.cookies.token!, secret, async function(err, decoded) {
    if(!err && decoded) {
      return await fn(req, res);
    }

    res.status(403).json({message: "Você deve estar logado"});
  });
}

export default authenticated;