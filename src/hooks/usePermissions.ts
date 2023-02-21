import useLoginStore from '@/store/login/login'

function usePermisssion(permissionId: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permissionId))
}

export default usePermisssion
