import { useEffect, useState } from "react";
import { DataTable } from "common";
import axios from "axios";
import { Country } from "./types";
import './index.css';

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

export function Features() {
  const [data, setData] = useState<Country[]>([]);
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortableColumns, setSortableColumns] = useState<string[]>(['name', 'population', 'area', 'capital', 'region']);
  const [filterableColumns, setFilterableColumns] = useState<string[]>(['name', 'region']);
  const [entries, setEntries] = useState<number>(5);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response?.data, '===> response');
      setData(response?.data);
    });
  }, []);

  useEffect(() => {
    let filtered = [...data];
    Object.keys(filters).forEach((key) => {
      filtered = filtered.filter((item) =>
        item[key as keyof Country]
          ?.toString()
          ?.toLowerCase()
          ?.includes(filters[key]?.toLowerCase())
      );
    });
    setFilteredData(data);
  }, [filters, data]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = 'ascending';
    if( sortConfig?.key === key && sortConfig?.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  const renderTableHeader = () => {
    return (
      <tr>
        {data[0] && Object.keys(data[0])?.map((key) => {
          console.log(key);
          return (
            <th key={key} >
              <span className={"table-head"}>
                
              {key}
              {sortableColumns?.find((column) => column === key) && (
                <button
                  onClick={() => requestSort(key)}
                  className={"sort-button"}
                >
                  &#x25B2;
                </button>
              )}
              </span>
            </th>
          )
        })}
      </tr>
    );
  }

  const renderTableFilters = () => {
    return (
      <tr>
        {data[0] && Object.keys(data[0])?.map((key) => {
          return (
            <td key={key}>
              {filterableColumns?.find((column) => column === key) && (
                <input
                  type="text"
                  value={filters[key] || ""}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      [key]: e.target.value,
                    });
                  }}
                />
              )}
            </td>
          );
        })}
      </tr>
    );
  }
  const getSortedData = () => {
    const sortedData = [...filteredData];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key as keyof Country] < b[sortConfig.key as keyof Country]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Country] > b[sortConfig.key as keyof Country]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }

  const renderTableRows = () => {
    const sortedData = getSortedData();
    const paginatedData = sortedData.slice((currentPage - 1) * entries, currentPage * entries);
    return paginatedData?.map((item) => {
      return (
        <tr key={item.name.common}>
          {Object.keys(item)?.map((key) => {
            return <td key={key}>{`${item[key as keyof Country]}`}</td>;
          })}
        </tr>
      );
    });
  }

  // const renderPagination = () => (
  //   <div className={"pagination"}>
  //     <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
  //     {Array.from({ length: Math.ceil(filteredData.length / entries) }).map((_, index) => (
  //       <button key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
  //     ))}
  //     <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
  //   </div>
  // )



  console.log(data, '===> data');

  return (
    <DataTable
      TableHeader={
        <>
        {renderTableHeader()}
        {renderTableFilters()}
        </>
        
      }
      TableBody={
        renderTableRows()
      }
      Pagination={
        <></>
        // renderPagination()
      }
    />
  );
}
