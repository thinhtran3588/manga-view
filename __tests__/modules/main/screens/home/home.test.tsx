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
  </div>
</div>
`);
  });
});
