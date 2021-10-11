/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render} from '@test/test-utils';
import {Home} from '@main/screens/home/home';

describe('Home', () => {
  it('renders successfully', async () => {
    const {container} = render(<Home />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="flex flex-col w-full"
  >
    <div
      class="flex rounded-full bg-white dark:bg-gray-600 p-2 shadow-xl w-full mb-2"
    >
      <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <input
        class="bg-transparent outline-none ml-2 flex-1"
        placeholder="Search manga"
        value=""
      />
      <button
        type="button"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
    <div
      class="flex flex-row flex-wrap"
    />
    
  </div>
</div>
`);
  });
});
