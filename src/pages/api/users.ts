import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  let data = [{}];

  if (method === 'GET') {
    const { db } = await connectToDatabase();

    data = await db.collection('users').find().toArray();

    res.status(200).json(data)
  } else {
    res.status(201).json(data);
  }

}

export default handler;