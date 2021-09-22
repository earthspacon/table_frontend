import { runInAction, makeAutoObservable } from 'mobx'
import * as api from 'api/api'
import TableModel from 'models/TableModel'

class Store {
  data: TableModel[] = null as any
  loading = true

  constructor() {
    makeAutoObservable(this)
  }

  async getData() {
    const res = await api.getData()
    runInAction(() => {
      this.data = res.data.map((elem) => ({ ...elem, key: elem._id }))
      this.loading = false
    })
  }
}

export default new Store()
