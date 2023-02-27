// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import query from '../';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt"});
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID"});
    return;
  }

  const response = await query(prompt, chatId, model) 
  const message: Message = {
    text: response || "`ChatGPT didn't find an answer on that",
  }
  res.status(200).json({ name: 'John Doe' })
}
