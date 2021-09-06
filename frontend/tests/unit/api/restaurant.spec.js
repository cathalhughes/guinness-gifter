import RestaurantApi from '@/api/restaurant'
import request from '@/utils/request'

const postRestaurantMock = (success = true) => {
    request.create = success ? jest.fn().mockResolvedValue('post data') : jest.fn().mockRejectedValue('error')
}

const getRestaurantMock = (success = true) => {
    request.fetch = success ? jest.fn().mockResolvedValue('get data') : jest.fn().mockRejectedValue('error')
}

const deleteRestaurantMock = (success = true) => {
    request.delete = success ? jest.fn().mockResolvedValue('delete data') : jest.fn().mockRejectedValue('error')
}

describe.skip('Tests for Restaurant Api', () => {
    const id = 1

    it('Should return a promise when - "postRestaurant" is called and api call suceeds', async () => {
        postRestaurantMock()
        const response = await RestaurantApi.postRestaurant({})
        expect(response).toEqual('post data')
    })

    it('Should return a promise when - "postRestaurant" is called and api is fails', async () => {
        postRestaurantMock(false)
        try {
            await RestaurantApi.postRestaurant({})
        } catch (e) {
            expect(e).toEqual('error')
        }
    })

    it('Should return a promise when - "getRestaurant" is called and api call suceeds', async () => {
        getRestaurantMock()
        const response = await RestaurantApi.getRestaurant(id)
        expect(response).toEqual('get data')
    })

    it('Should return a promise when - "getRestaurant" is called and api is fails', async () => {
        getRestaurantMock(false)
        try {
            await RestaurantApi.getRestaurant(id)
        } catch (e) {
            expect(e).toEqual('error')
        }
    })

    it('Should return a promise when - "deleteRestaurant" is called and api call suceeds', async () => {
        deleteRestaurantMock()
        const response = await RestaurantApi.deleteRestaurant(id)
        expect(response).toEqual('delete data')
    })

    it('Should return a promise when - "deleteRestaurant" is called and api is fails', async () => {
        deleteRestaurantMock(false)
        try {
            await RestaurantApi.deleteRestaurant(id)
        } catch (e) {
            expect(e).toEqual('error')
        }
    })
})
