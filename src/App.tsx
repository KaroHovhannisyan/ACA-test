import React from "react";
import "./App.css";
import { Table } from "./common/components";
import { getMockedData, sortByKey } from "./common/utils/helperFunctions";
import { DATA_CHUNK_SIZE } from "./configs/constants";
import { IProgrammingLanguageRate, ISortConfig, ITableHeaderConfig } from "./interfaces";


const headers: ITableHeaderConfig[] = [
  {
    dataIndex: "name",
    title: "Name",
    width: 200,
    sorter: false,
  },
  {
    dataIndex: "rate",
    title: "Rating",
    width: 120,
    sorter: true,
  },
];

function App() {
  const [sortedBy, setSortedBy] = React.useState<ISortConfig>({
    dataIndex: "rate",
    mode: "asc",
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const mockData = React.useMemo<IProgrammingLanguageRate[]>(getMockedData, []);

  const [data, setData] = React.useState<IProgrammingLanguageRate[]>(mockData.slice(0, DATA_CHUNK_SIZE));

  const handleSort = React.useCallback((sortConfig: ISortConfig) => {
    setSortedBy(sortConfig);
    document.getElementById('tbody')?.scrollTo(0, 0);
  }, []);

  const sortedData: IProgrammingLanguageRate[] = React.useMemo(() => {
    return sortByKey(data, sortedBy);
  }, [sortedBy, data]);

  const handleScrollEnd = React.useCallback(() => {
    if (data.length === mockData.length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(mockData.slice(0, data.length + DATA_CHUNK_SIZE));
    }, 2000);
  }, [data]);

  const handleRemoveItems = React.useCallback((selectedIds: number[])=> {
    setData(data.filter((d: IProgrammingLanguageRate) => !selectedIds.includes(d.id)))
  }, [data]);

  return (
    <Table<IProgrammingLanguageRate>
      headers={headers}
      data={sortedData}
      onItemClick={(item) => console.log(item)}
      onRemoveItems={handleRemoveItems}
      sortedBy={sortedBy}
      onSort={handleSort}
      onScrollEnd={handleScrollEnd}
      loading={loading}
    />
  );
}

export default App;
