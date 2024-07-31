import { ReactNode } from "react";

export interface TableColumns {
  label: string;
  dataColumn: any;
  noWrap?: boolean;
  center?: boolean;
  maxWidth?: number;
  width?: number;
}
export interface TableRows {
  data: any[];
  actionIcons?: ReactNode;
}

export enum TableRowsActionTypes {
  NAVIGATION,
  ACTION,
}

export interface TableActionIconsProps {
  view?: {
    type: TableRowsActionTypes;
    dispatchAction?: any;
    navigationRoute?: string;
  };
  edit?: {
    type: TableRowsActionTypes;
    dispatchAction?: any;
    navigationRoute?: string;
  };
  deleteAction?: (id?: any) => Promise<void>;
  disableAction?: (id?: any) => Promise<void>;
}
