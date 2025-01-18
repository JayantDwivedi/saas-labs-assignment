import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { TableMockData } from './constants';


global.fetch = jest.fn();

describe('App Component', () => {

  let consoleErrorSpy;
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('renders the container and heading correctly', () => {
    render(<App />);

    const container = screen.getByText(/Saas Labs assignment/i);
    expect(container).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /Saas Labs assignment/i });
    expect(heading).toBeInTheDocument();
  });


  test('should render data after successful API call', async () => {
    const mockData = TableMockData;

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    render(<App />);

    await screen.findByText(/15823/) 
    expect(screen.getByText(/15823/)).toBeInTheDocument();
  });

  test('should show error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error fetching data')
      );
    });
  });
});
