import { observable } from 'mobx'

export default class TileModel {
  store
  id
  row
  col
  @observable isActive

  constructor (store, id, row, col, isActive) {
    this.store = store
    this.id = id
    this.row = row
    this.col = col
    this.isActive = isActive
  }

  start () {
    this.isActive = true
  }

  stop () {
    this.isActive = false
  }

  toJS () {
    const { id, row, col, isActive } = this
    return ({ id, row, col, isActive })
  }

}
