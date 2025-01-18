import React from 'react'
import { useState, useEffect } from 'react';
import "./table.css";

const Table = ({ columns, pagination, data, loading }) => {
    const [tdata, setTdata] = useState(data ?? []);
    const [dataToShow, setDataToShow] = useState([]);
    const [pageIndex, setPageIndex] = useState(pagination?.pageIndex ?? 0);
    const [pageSize, setPageSize] = useState(pagination?.pageSize ?? 10);

    useEffect(() => {
        setTdata(data);
    }, [data]);

    const getPaginatedData = () => {
        const startIndex = (pageIndex * pageSize);
        const endIndex = (((pageIndex * pageSize) + pageSize));
        const trimmedArr = tdata?.slice(startIndex, endIndex);
        setDataToShow(trimmedArr);
    }

    useEffect(() => {
        if (tdata.length > 0) {
            getPaginatedData();
        }
    }, [pageIndex, pageSize, JSON.stringify(tdata)])


    const handleNext = () => {
        if (((pageIndex * pageSize) + 1) === tdata.length) return;
        setPageIndex(pageIndex + 1);
    }

    const handlePrev = () => {
        if (pageIndex === 0) return;
        setPageIndex(pageIndex - 1);
    }

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        {columns?.map((x) => (<th key={x.value}>{x.label}</th>))}
                    </tr>
                </thead>
                {
                    loading ?
                        (<div className='loading-container'>
                            <span class="loader"></span>
                        </div>) : (
                            <tbody>
                                {dataToShow?.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns?.map((col, colIndex) => (
                                            <td key={colIndex}>{row[col.value]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        )
                }
            </table>
            {pagination && (<div className='pagination-container'>
                <button className='pagination-btn' disabled={pageIndex === 0} onClick={handlePrev}>  <i class="fa-solid fa-chevron-left"></i></button>
                {pageIndex + 1}
                <button className='pagination-btn' disabled={((pageIndex * pageSize) + 1) === tdata.length} onClick={handleNext}><i class="fa-solid fa-chevron-right"></i></button>
            </div>)}

        </div>
    )
}

export default Table
