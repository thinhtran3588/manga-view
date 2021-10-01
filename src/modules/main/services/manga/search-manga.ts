/* eslint-disable max-len */
import {v4 as uuidv4} from 'uuid';
import type {Manga} from '@main/interfaces';
import type {CursorQueryResult} from '@core/interfaces';

export const searchManga = async (_searchTerm: string, _nextToken?: string): Promise<CursorQueryResult<Manga>> => {
  await new Promise((r) => setTimeout(r, 200));
  const data = Array.from(Array(20), (x, i) => i).map(
    (i) =>
      ({
        id: uuidv4(),
        name: `name ${i}`,
        otherName: `otherName ${i}`,
        author: `author ${i}`,
        status: `status ${i}`,
        lastUpdated: `lastUpdated`,
        // eslint-disable-next-line max-len
        description:
          i % 2 === 0
            ? `description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i}`
            : `description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i} description description description description description description description description description description description description description description${i}`,
        genres: [`kid`, 's', 'sss', 'scc', 'ss'],
      } as Manga),
  );
  return {
    data,
    pagination: {
      nextToken: 'nextToken',
    },
  };
};
