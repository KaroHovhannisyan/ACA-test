import React, { PropsWithChildren, SyntheticEvent } from "react";
import { ISortConfig, ITableHeaderConfig } from "../../../interfaces";
import CheckBox from "../CheckBox/CheckBox";
import Loader from "../Loader/Loader";
import "./Table.styles.scss";

type IProps<T> = {
  headers: ITableHeaderConfig[];
  data: T[];
  onItemClick: (item: T) => void;
  onRemoveItems: (ids: number[]) => void;
  sortedBy: ISortConfig;
  onSort: (sortItem: ISortConfig) => void;
  onScrollEnd: () => void;
  loading: boolean;
}

const Table = <T extends { id: number }>({
  headers,
  data,
  sortedBy,
  onSort,
  onScrollEnd,
  loading,
  onRemoveItems,
  onItemClick,
}: IProps<T>) => {

  const [selectedItemsIds, setSelectedItemsIds] = React.useState<number[]>([]);

  const handleScroll = (e: any) => {
    const bottom =
      Math.floor(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) onScrollEnd();
  };

  const handleElementCheck = (id: number) => {
       let selectedItemsIdsCopy: number[] = [...selectedItemsIds];
    
      if (selectedItemsIdsCopy.includes(id)) {
        selectedItemsIdsCopy = selectedItemsIdsCopy.filter((e: number) => e !== id);
      } else {
        selectedItemsIdsCopy.push(id);
      }

      setSelectedItemsIds(selectedItemsIdsCopy);
  }

  const handleRemoveItems = () => {
    onRemoveItems(selectedItemsIds);
    setSelectedItemsIds([]);
  }

  return (
    <div className="container">
      <button disabled={!selectedItemsIds.length} onClick={handleRemoveItems}>Remove Selected</button>
      <table>
        <thead>
          <tr>
            <th style={{ width: 10 }}/>
            {headers.map((header: ITableHeaderConfig) => (
              <th
                scope="col"
                style={{ width: header.width }}
                key={header.dataIndex}
                onClick={() =>
                  onSort({
                    dataIndex: header.dataIndex,
                    mode: sortedBy.mode === "asc" ? "desc" : "asc",
                  })
                }
              >
                {
                  <span
                    className={
                      header.sorter
                        ? `sort-by ${
                            sortedBy.dataIndex === header.dataIndex
                              ? sortedBy.mode
                              : ""
                          } `
                        : ""
                    }
                  >
                    {header.title}
                  </span>
                }
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div id="tbody" onScroll={handleScroll}>
        <table>
          <tbody>
            {data.map(d => (
              <tr key={d.id} onClick={() => onItemClick(d)}>
                <td style={{ width: 10 }}><CheckBox onChange={() => handleElementCheck(d.id)} /></td>
                {headers.map((key: ITableHeaderConfig) => (
                      // @ts-ignore
                      <td>{d[key.dataIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Table;
