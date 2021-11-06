import type {CursorQueryResult, Manga} from '@api/main/interfaces';
import {mangaServices} from '@api/main/services/mangas';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<CursorQueryResult<Manga>>): Promise<void> => {
  const result = await mangaServices[req.query.sourceId as string].search(req.query);
  res.status(200).json(result);
};
