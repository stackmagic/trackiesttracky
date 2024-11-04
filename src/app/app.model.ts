export interface BaseMapData {
  id: number;
  uid: string;
  img: string;
  userData: UserMapData;
}

export type BaseMapDataFilter = (bmd: BaseMapData) => boolean;
export type BaseMapSort = (a: BaseMapData, b: BaseMapData) => number;

export interface UserMapData {
  finished: boolean;
  favourite: boolean;
  notes: string;
}

export interface UserMapDataById {
  [key: number]: UserMapData;
}
