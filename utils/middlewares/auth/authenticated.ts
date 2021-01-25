import { verify } from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest,  res: NextApiResponse ) => {
  verify(req.cookies.token!, process.env.JWT_SECRET, async function(err, decoded) {
    if(!err && decoded) {
      return await fn(req, res);
    }

    res.status(403).json({message: "Você deve estar logado"});
  });
}

export default authenticated;