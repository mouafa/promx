function promx(promise: Promise<any>): Promise<[any, any]> {
  return new Promise(resolve => {
    promise.then(
      (res = null) => resolve([null, res]),
      (err = new Error('Promx Default Error')) => resolve([err, null])
    )
  })
}

export default promx
