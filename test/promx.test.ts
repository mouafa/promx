import promx = require('../src/promx')

describe('promx - resolve spec', () => {
  test('resolve nothing', async () => {
    const [err, res] = await promx(Promise.resolve())
    expect(err).toBe(null)
    expect(res).toBe(null)
  })

  test('resolve string', async () => {
    const [err, res] = await promx(Promise.resolve('success'))
    expect(err).toBe(null)
    expect(res).toBe('success')
  })

  test('resolve object', async () => {
    const [err, res] = await promx(Promise.resolve({ response: 'success' }))
    expect(err).toBe(null)
    expect(res).toEqual({ response: 'success' })
  })

  test('reslove async', async () => {
    const [err, res] = await promx(successAsync())
    expect(err).toEqual(null)
    expect(res).toEqual({ status: 'success' })
  })
})

describe('promx - reject spec', () => {
  test('reject nothing', async () => {
    const [err, res] = await promx(Promise.reject())
    expect(err).toEqual(promx.errors.default)
    expect(res).toBe(null)
  })

  test('reject string', async () => {
    const [err, res] = await promx(Promise.reject('fail'))
    expect(err).toBe('fail')
    expect(res).toBe(null)
  })

  test('reject object', async () => {
    const [err, res] = await promx(Promise.reject({ response: 'fail' }))
    expect(err).toEqual({ response: 'fail' })
    expect(res).toBe(null)
  })

  test('reject async', async () => {
    const customErr = new Error('failing')
    const [err, res] = await promx(FailAsync())
    expect(err).toEqual(customErr)
    expect(res).toBe(null)
  })
})

describe('promx - timeout option', () => {
  const options = {
    timeout: 100,
  }

  test('resolve timeout error', async () => {
    const [err, res] = await promx(successAsync(200), options)
    expect(err).toEqual(promx.errors.timeout)
    expect(res).toBe(null)
  })

  test('resolve value', async () => {
    const [err, res] = await promx(successAsync(50), options)
    expect(err).toBe(null)
    expect(res).toEqual({ status: 'success' })
  })
})

/* utility */

async function successAsync(time = 100) {
  await waitfor(time)
  return { status: 'success' }
}

async function FailAsync(time = 100) {
  await waitfor(time)
  throw new Error('failing')
}

function waitfor(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}
