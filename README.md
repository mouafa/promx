<p align="center"><img width="auto" src="https://raw.githubusercontent.com/mouafa/promx/master/assets/cover.png"></p>

# PROMX

a natural/modern/safer way to handle promise in async/await

## Installation

```console
$ yarn add promx
```

If you prefer using npm:

```console
$ npm i -S promx
```

## Usage

promx will allow you to write code like this:

```js
import promx from 'promx'

async function main() {
  const [err, res] = await promx(fetch('http://example.com/movies.json'))
  if (err) console.warn('failed to load data')
  else console.log({ res })
}

main()
```

Instead of this:

```js
async function main() {
  try {
    await fetch('http://example.com/movies.json')
  } catch (err) {
    console.warn('failed to load data')
    return
  }
  console.log({ res })
}

main()
```

---

timeout the promise if it took longer then 1 second:

```js
import promx from 'promx'

async function main() {
  const [err, res] = await promx(fetch('http://example.com/movies.json'), { timeout: 1000 })
  if (err) console.warn('failed to load data')
  else console.log({ res })
}

main()
```

## API

promx(promise, [options])

#### promise

Type: `Promise`

Receives a promise that will eventually resolve or reject

#### options

Type: `Object`

##### options.timeout

Type: `Number`

timeout duration in ms before resolving with timout error

## License

MIT © mouafa
