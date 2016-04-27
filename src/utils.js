export const times = (i, cb, l = i) => {
  if (i === 0) return
  cb(l - i)
  times(i - 1, cb, l)
}

export const leadingZero = (h) => (h < 10) ? (`0${h}`) : h

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
