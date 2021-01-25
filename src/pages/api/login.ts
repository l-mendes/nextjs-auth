import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export interface Payload {
  _id: string,
  name: string,
  email: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    const { email, password } = req.body;

    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({success: false, message: `Method ${method} Not Allowed`});
    }

    if (!email || !password) {
      res.status(422).json({success:false, message: "Por favor preencha todos os campos"});
    }

    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({"email": `${email}`});

    if (!user) {
      res.status(404).json({success: false, message: "Usuário não encontrado"});
    }

    const validation = await bcrypt.compare(password, user.password);

    const { _id, name } = user;

    const payload: Payload = {
      _id,
      name,
      email
    };

    if (validation) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });

      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 604800,
        path: '/'
      }));

      res.status(201).json({success: true, message: "Bem vindo de volta!"});

    } else {
      res.status(401).json({success:false, message: "Credenciais inválidas"});
    }

  } catch (err) {
    res.status(500).json({success: false, message: err.message })
  }
}

export default handler;