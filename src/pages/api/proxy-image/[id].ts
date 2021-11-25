import axios from 'axios';
import last from 'lodash/fp/last';
import mime from 'mime-types';
import type {NextApiRequest, NextApiResponse} from 'next';

const SOURCES: {[id: string]: string} = {
  '1': 'https://www.nettruyenpro.com/',
  '2': 'https://blogtruyen.vn/',
  '3': 'https://ww.mangakakalot.tv/',
};

export default async (req: NextApiRequest, res: NextApiResponse<void>): Promise<void> => {
  const {url, sourceId} = req.query;
  const imageRes = await axios.get<MediaStream>(url as string, {
    responseType: 'stream',
    headers: {
      Referer: SOURCES[sourceId as string],
    },
  });
  const fileName = last((url as string)?.split('/'))?.split('?')[0] as string;
  const contentType = mime.contentType(fileName);
  res.writeHead(200, {
    ...(contentType ? {'Content-Type': contentType} : {}),
    'Cache-Control': 'max-age=2592000',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (imageRes.data as any).pipe(res);
};
