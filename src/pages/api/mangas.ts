import type {CursorQueryResult, Manga} from '@api/main/interfaces';
import {search} from '@api/main/services/mangas/search';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<CursorQueryResult<Manga>>): Promise<void> => {
  const result = await search(req.query);
  res.status(200).json(result);
};
