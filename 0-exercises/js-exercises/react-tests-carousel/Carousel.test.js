import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Carousel from './Carousel';

it('renders Carousel component', function () {
  render(<Carousel />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when clicking left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move right:
  const rightArrow = queryByTestId('right-arrow');
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(rightArrow);
  fireEvent.click(leftArrow);

  // expect the third image to show, and not the first:
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('hides the left arrow when carousel is in the first image', function () {
  const { queryByTestId, debug } = render(<Carousel />);
  expect(queryByTestId('left-arrow').style._values).toEqual({
    display: 'none',
  });
});

it('hides the right arrow when carousel is in the last image', function () {
  // arrow displays when carousel is not in last img:
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId('right-arrow');

  // carousel goes to last image:
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // check right arrow hidden:
  expect(queryByTestId('right-arrow').style._values).toEqual({
    display: 'none',
  });
});
