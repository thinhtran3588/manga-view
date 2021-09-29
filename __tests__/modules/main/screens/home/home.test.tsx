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
    class="m-2"
  >
    demo
    <button
      class="bg-gradient dark:bg-gradient-light py-2 px-4 rounded-full text-white font-bold"
    >
      Test button
    </button>
  </div>
</div>
`);
  });
});
