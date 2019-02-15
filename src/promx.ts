const errors = {
  default: new Error('Promx Default Error'),
  timeout: new Error('Promx Timeout Error'),
}

function promx<T>(
  promise: Promise<T | null>,
  options: PromxOptions = {}
): Promise<[object | null, T | null]> {
  return new Promise(resolve => {
    promise.then(
      (res = null) => resolve([null, res]),
      (err = errors.default) => resolve([err, null])
    )

    if (options.timeout) setTimeout(() => resolve([errors.timeout, null]), options.timeout)
  })
}

interface PromxOptions {
  timeout?: number
}

export = promx
