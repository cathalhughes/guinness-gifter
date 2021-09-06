import axios from 'axios'

jest.mock('axios')

describe('Tests for API request utility', () => {
  let request, headers

  beforeAll(() => {
    axios.interceptors.request.use = jest.fn((success) => {
      success({ headers })
    })

    axios.interceptors.response.use = jest.fn((success) => {
      success({ data: {} })
    })

    axios.get = jest.fn((url) => {
      if (url === '/test') {
        return Promise.resolve({
          data: 'data'
        })
      }
    })

    axios.post = jest.fn((url) => {
      if (url === '/test') {
        return Promise.resolve({
          data: 'created'
        })
      }
    })

    axios.put = jest.fn((url) => {
      if (url === '/test') {
        return Promise.resolve({
          data: 'updated'
        })
      }
    })

    axios.delete = jest.fn((url) => {
      if (url === '/test') {
        return Promise.resolve({
          data: 'deleted'
        })
      }
    })
    axios.create = jest.fn(function () {
      return this
    })

    request = require('@/utils/request').default
  })

  it('testing get', async () => {
    const response = await request.fetch('/test', {})
    expect(response).toMatchObject({ data: 'data' })
  })

  it('testing post', async () => {
    const response = await request.create('/test', {})
    expect(response).toMatchObject({ data: 'created' })
  })

  it('testing put', async () => {
    const response = await request.update('/test', {})
    expect(response).toMatchObject({ data: 'updated' })
  })

  it('testing delete', async () => {
    const response = await request.delete('/test', {})
    expect(response).toMatchObject({ data: 'deleted' })
  })

  it('testing setHeader', async () => {
    request.setHeader({ 'abc': 'text/html' })
    await request.fetch('/test', {})
  })
})

describe('Tests for API request utility : failure cases', () => {
  let request
  beforeAll(() => {
    axios.interceptors.request.use = jest.fn((success, failure) => {
      failure({ data: 'failed request' })
    })

    axios.interceptors.response.use = jest.fn((success, failure) => {
      failure({ data: 'failure' })
    })

    axios.get = jest.fn((url) => {
      if (url === '/failedtest') {
        return Promise.reject(Error('error'))
      }
    })

    axios.create = jest.fn(function () {
      return this
    })

    request = require('@/utils/request').default
  })

  it('testing responsne interceptor failure', () => {
    request.fetch('/failedtest', {}).then(() => {
    }, (error) => {
      expect(error).toMatchObject(Error('error'))
    })
  })
})
