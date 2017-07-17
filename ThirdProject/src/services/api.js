/**
 * Created by 0easy-23 on 2017/7/10.
 */

import {
    getCookies,
    getCsrfFromCookies,
    request
} from './request'

export async function topArtists (
    limit = '10',
    offset = '0'
) {
    return await request
        .get(`/api/artist/top?offset=${offset}&total=true&limit=${limit}`)
}