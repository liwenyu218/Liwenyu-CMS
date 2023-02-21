export interface ISearchConfig {
  pageName: string
  formItems: FormItem[]
}

export type FormItem = InputItem | SelectItem | CustomItem | DatePickItem

interface BaseItem {
  prop: string
  label: string
}

interface InputItem extends BaseItem {
  type: 'input'
  initial?: string
  placeholder: string
}

interface SelectItem extends BaseItem {
  type: 'select'
  placeholder: string
  options: Option[]
}

interface CustomItem extends BaseItem {
  type: 'custom'
  slotName: string
}

interface DatePickItem extends BaseItem {
  type: 'date-picker'
}

interface Option {
  id: number
  label: string
}
