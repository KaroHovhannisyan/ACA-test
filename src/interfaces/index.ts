export interface IProgrammingLanguageRate {
    name: string;
    rate: number;
    id: number;
}

export interface ISortConfig {
    dataIndex: string;
    mode: string;
}

export interface ITableHeaderConfig {
    dataIndex: string;
    title: string;
    width: number;
    sorter: boolean;
}

export interface ITableData {
    dataIndex: string;
    title: string;
    width: number;
    sorter: boolean;
}