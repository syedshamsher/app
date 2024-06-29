import React from "react";
import './index.css';

type DataTableProps = {
  TableHeader: React.ReactNode;
  TableBody: React.ReactNode;
  Pagination: React.ReactNode;
};
export const DataTable: React.FC<DataTableProps> = (props) => {
  const { TableHeader, TableBody, Pagination } = props;
  return (
    <div className={"data-table-container"}>
      <table className={"data-table"}>
        <thead>
          {TableHeader}
        </thead>
        <tbody>
          {TableBody}
        </tbody>
      </table>
      {Pagination}
    </div>
  );
};
