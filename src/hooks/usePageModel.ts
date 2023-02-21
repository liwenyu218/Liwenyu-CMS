import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'

type CallbackType = (arg?: any) => void

export default function usePageModel(
  editCallback?: CallbackType,
  newCallback?: CallbackType
) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewClick = () => {
    if (newCallback) newCallback()
    modelRef.value?.setModelVisible()
  }
  const handleEditClick = (itemData: any) => {
    modelRef.value?.setModelVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modelRef,
    handleEditClick,
    handleNewClick
  }
}
