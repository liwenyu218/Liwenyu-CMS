export interface IModelConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: FormItem[]
}

export type FormItem = InputItem | SelectItem | CustomItem

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

interface Option {
  id: number
  label: string
}
