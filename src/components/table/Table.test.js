import { render, screen} from '@testing-library/react';
import Table from './Table';
import { NewDataForTest, TableColumns, TableMockData, TablePagination } from '../../constants';


describe('Table Component', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const columns = TableColumns;

    const data = TableMockData;

    const pagination = TablePagination;

    const loading = false;

    test('rendering the data properly', () => {
        render(<Table columns={columns} pagination={pagination} data={data} loading={loading} />);

        expect(screen.getByText(/S.No./i)).toBeInTheDocument();
        expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount pledged/i)).toBeInTheDocument();

        expect(screen.getByText(/186/)).toBeInTheDocument();
        expect(screen.getByText(/15823/)).toBeInTheDocument();
    });

    test('loader render if loading is false', () => {
        render(<Table columns={columns} pagination={pagination} data={data} loading={true} />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });


    test('disables prev button on the first page', () => {
        render(<Table columns={columns} pagination={{ ...pagination, pageIndex: 0 }} data={data} loading={loading} />);

        const prevButton = screen.getByTestId('prev-btn');
        expect(prevButton).toBeDisabled();
    });

    test('disables next button when on the last page', async () => {
        const pagination = { pageIndex: 1, pageSize: 5 };
        render(<Table columns={columns} pagination={pagination} data={data} loading={loading} />);

        // Check if next button is disabled on the last page
        const nextButton = screen.getByTestId('next-btn');
        expect(nextButton).toBeDisabled();
    });

    test('updates data when new data is passed', () => {
        const newData = NewDataForTest

        const { rerender } = render(<Table columns={columns} pagination={pagination} data={data} loading={loading} />);

        // Re-render component with new data
        rerender(<Table columns={columns} pagination={pagination} data={newData} loading={loading} />);

        // Check if new data is rendered
        expect(screen.getByText(/S.No./i)).toBeInTheDocument();
        expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount pledged/i)).toBeInTheDocument();

        expect(screen.getByText(/186/)).toBeInTheDocument();
        expect(screen.getByText(/15823/)).toBeInTheDocument();

        expect(screen.getByText(/15823/)).toBeInTheDocument();
    });

    test('check correct pageNumber render', () => {
        const pagination = { pageIndex: 3, pageSize: 5 }

        render(<Table columns={columns} pagination={pagination} data={data} loading={loading} />);

        expect(screen.getByText(pagination.pageIndex + 1)).toBeInTheDocument();
    });



});
