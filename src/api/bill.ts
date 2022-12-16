import http, {Response} from '@/libs/http'

export interface BillTypeItem {
  id: number
  name: string
  type: number
}

export function apiGetBillTypeList(): Promise<Response<{ list: BillTypeItem[] }>> {
  return http.get('/billType')
}
