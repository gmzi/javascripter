import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { renderIntoDocument } from 'react-dom/test-utils';

it('renders Card component', function () {
  render(<Card />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
