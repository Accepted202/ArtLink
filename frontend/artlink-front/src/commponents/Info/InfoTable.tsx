interface TableRow {
  [key: string]: string | number;
}

interface Props {
  columnHeaders: string[];
  data: TableRow[];
  columnWidths: string[];
}

function InfoTable({ columnHeaders, data, columnWidths }: Props) {
  const getColumnValue = (row: TableRow, columnKey: string) => {
    return row[columnKey];
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header, columnIndex) => (
              <th
                key={columnIndex}
                style={{ width: columnWidths[columnIndex] }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((columnKey, cellIndex) => (
                <td key={cellIndex} style={{ width: columnWidths[cellIndex] }}>
                  {getColumnValue(row, columnKey)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InfoTable;
