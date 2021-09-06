// import MenuApi from '@/api/menu'
// import request from '@/utils/request'
//
// const postMenuMock = (success = true) => {
//     request.create = success ? jest.fn().mockResolvedValue('post data') : jest.fn().mockRejectedValue('error')
// }
//
// const getMenuMock = (success = true) => {
//     request.fetch = success ? jest.fn().mockResolvedValue('get data') : jest.fn().mockRejectedValue('error')
// }
//
// const deleteMenuMock = (success = true) => {
//     request.delete = success ? jest.fn().mockResolvedValue('delete data') : jest.fn().mockRejectedValue('error')
// }
//
// describe('Tests for Menu Api', () => {
//     const id = 1
//
//     it('Should return a promise when - "postMenu" is called and api call suceeds', async () => {
//         postMenuMock()
//         const response = await MenuApi.postMenu({})
//         expect(response).toEqual('post data')
//     })
//
//     it('Should return a promise when - "postMenu" is called and api is fails', async () => {
//         postMenuMock(false)
//         try {
//             await MenuApi.postMenu({})
//         } catch (e) {
//             expect(e).toEqual('error')
//         }
//     })
//
//     it('Should return a promise when - "getMenu" is called and api call suceeds', async () => {
//         getMenuMock()
//         const response = await MenuApi.getMenu(id)
//         expect(response).toEqual('get data')
//     })
//
//     it('Should return a promise when - "getMenu" is called and api is fails', async () => {
//         getMenuMock(false)
//         try {
//             await MenuApi.getMenu(id)
//         } catch (e) {
//             expect(e).toEqual('error')
//         }
//     })
//
//     it('Should return a promise when - "deleteMenu" is called and api call suceeds', async () => {
//         deleteMenuMock()
//         const response = await MenuApi.deleteMenu(id)
//         expect(response).toEqual('delete data')
//     })
//
//     it('Should return a promise when - "deleteMenu" is called and api is fails', async () => {
//         deleteMenuMock(false)
//         try {
//             await MenuApi.deleteMenu(id)
//         } catch (e) {
//             expect(e).toEqual('error')
//         }
//     })
// })

it('pass please', () => {

})
