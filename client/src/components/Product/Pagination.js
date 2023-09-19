import React, { useState } from 'react';

function usePagination(data, itemsPerPage, productsCount) {
    const [currentPage, setCurrentPage] = useState(1);
    console.log(data);
    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, productsCount));
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, productsCount));
    }

    return { next, prev, jump, currentData, currentPage, productsCount };
}

export default usePagination;
