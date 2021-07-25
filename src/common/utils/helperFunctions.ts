import { MOCK_DATA_SIZE } from "../../configs/constants";
import { IProgrammingLanguageRate, ISortConfig } from "../../interfaces";

export const sortByKey = <T>(data: T[], sortConfig: ISortConfig) => {
    // @ts-ignore
    return data.sort((a: T ,b: T) =>sortConfig.mode === "desc" ? a[sortConfig.dataIndex] - b[sortConfig.dataIndex]: b[sortConfig.dataIndex] - a[sortConfig.dataIndex])
};

export const getMockedData = () => {
    const data: IProgrammingLanguageRate[] = []

    for( let i = 0; i < MOCK_DATA_SIZE;  i++ ) {
        data.push({
            name: 'React',
            rate: 200 - i,
            id: i,
        })
    }

    return data;
}