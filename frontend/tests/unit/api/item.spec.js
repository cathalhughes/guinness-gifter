import ItemApi from '@/api/item'
import request from '@/utils/request'

const postItemMock = (success = true) => {
    request.create = success ? jest.fn().mockResolvedValue('post data') : jest.fn().mockRejectedValue('error')
}

const getItemMock = (success = true) => {
    request.fetch = success ? jest.fn().mockResolvedValue('get data') : jest.fn().mockRejectedValue('error')
}

const deleteItemMock = (success = true) => {
    request.delete = success ? jest.fn().mockResolvedValue('delete data') : jest.fn().mockRejectedValue('error')
}

describe.skip('Tests for Restaurant Api', () => {
    const id = 1

    it('Should return a promise when - "postItem" is called and api call suceeds', async () => {
        postItemMock()
        const response = await ItemApi.postItem({})
        expect(response).toEqual('post data')
    })

    it('Should return a promise when - "postItem" is called and api is fails', async () => {
        postItemMock(false)
        try {
            await ItemApi.postItem({})
        } catch (e) {
            expect(e).toEqual('error')
        }
    })

    it('Should return a promise when - "getItem" is called and api call suceeds', async () => {
        getItemMock()
        const response = await ItemApi.getItem(id)
        expect(response).toEqual('get data')
    })

    it('Should return a promise when - "getItem" is called and api is fails', async () => {
        getItemMock(false)
        try {
            await ItemApi.getItem(id)
        } catch (e) {
            expect(e).toEqual('error')
        }
    })

    it('Should return a promise when - "deleteItem" is called and api call suceeds', async () => {
        deleteItemMock()
        const response = await ItemApi.deleteItem(id)
        expect(response).toEqual('delete data')
    })

    it('Should return a promise when - "deleteItem" is called and api is fails', async () => {
        deleteItemMock(false)
        try {
            await ItemApi.deleteItem(id)
        } catch (e) {
            expect(e).toEqual('error')
        }
    })
})
