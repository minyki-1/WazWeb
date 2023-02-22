export const setRefresh = ({ id, storage = sessionStorage }: { id: string, storage?: Storage }) => {
  const refreshDate = new Date()
  refreshDate.setMinutes(refreshDate.getMinutes() + 3)
  storage.setItem("refresh_" + id, refreshDate.toISOString())
}

export const refreshExpired = ({ id, storage = sessionStorage }: { id: string, storage?: Storage }) => {
  const refresh = storage.getItem("refresh_" + id)
  return !refresh || new Date(refresh) < new Date()
}
