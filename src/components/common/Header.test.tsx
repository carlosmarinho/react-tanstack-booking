import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { leftItems, rightItems } from '../../helpers/Menu';

describe('Header', () => {
  // beforeAll(() => {
  //   window.matchMedia = (query) => ({
  //     matches: false,
  //     media: query,
  //     onchange: null,
  //     addListener: jest.fn(), // deprecated
  //     removeListener: jest.fn(), // deprecated
  //     addEventListener: jest.fn(),
  //     removeEventListener: jest.fn(),
  //     dispatchEvent: jest.fn(),
  //   });
  // });

  it('should render the Header without search bar component properly ', async () => {
    const queryClient = new QueryClient({});

    const leftMenuLength = leftItems.length;
    const rightMenuLength = rightItems(jest.fn()).length;

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Header showSearchBar={false} />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    /**
     * @todo verify the need of waitfor to remove warning in text, when
     * using others library to management global state like redux and graphql, I didn't need that
     */
    await waitFor(() => {
      const logo = screen.getByRole('img', {
        name: /logo my booking/i,
      });
      expect(logo).toBeInTheDocument();

      const menu = screen.getAllByRole('menuitem');
      expect(menu.length).toBe(
        leftMenuLength + rightMenuLength,
      );
    });
  });
});
