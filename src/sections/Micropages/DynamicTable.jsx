import React from "react";

const DynamicTable = ({ table }) => {
  if (!table || !Array.isArray(table) || table.length === 0) return null;

  const [header, ...rows] = table;

  return (
    <div className="table-wrapper">
      <table className="dynamic-table">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={`head-${i}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
