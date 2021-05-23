import {
    responseService
} from './reponse.service'

export const fileApi = {
    getListFile
}

function getListFile() {
    let endpoint = `localhost:3010/listTestCase`
    let request = {
        method: 'GET'
    }
    return responseService.fetchRetry(endpoint, request, 1)
}
