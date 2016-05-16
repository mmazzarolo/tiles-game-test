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
    if (this.isActive) {
      this.isActive = false
      this.store.incrementScore()
    } else {
      this.store.popOneHeart()
    }
  }

  toJS () {
    const { id, row, col, isActive } = this
    return ({ id, row, col, isActive })
  }

}
