import type {Ref} from "vue";

export interface TableColumn<T = any> {
    prop?: keyof T | string
    label: string
    width?: string
    align?: 'left' | 'center' | 'right'
    compute?: (
        row: T,
        column?: TableColumn<T>,
        cellValue?: any,
        index?: number
    ) => string,
    fixed?: 'left' | 'right',
    clickBtn?: (row: T, index?: number) => void,
    btnTexts?: Array<string>
}

export interface Building {
    buildingId: string
    name: string
    address: string
}

export interface User {
    userId: string
    account: string
    realName: string
}

export interface TableActionButton<T = any> {
    text: string,
    onClick?: () => void
}

/*
{
    label: '楼名',
    prop: 'name',
    type: 'input',
  },
 */
export interface FormItem<T = any> {
    label?: string,
    prop?: string,
    type: 'input' | 'select' | 'buttons',
    isNumberInput?: boolean,
    placeHolder?: string,
    selectData?: Array<FormSelectItem | String | number>,
    buttonsData?: Array<FormButton>,
    required?: boolean,
    defaultValue?: any,
}
export interface FormButton {
    text: string,
    type?: 'primary' | 'secondary' | 'success' | 'warning' | 'info',
    plain?: boolean,
    onClick?: (obj: Ref) => void,
    validate?: boolean
}
export interface FormSelectItem {
    label: string,
    value?: string | number
}
