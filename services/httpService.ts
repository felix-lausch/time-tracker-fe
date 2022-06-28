import getConfig from 'next/config'

export type HttpFetchParams = {
    endpoint: string
    baseUrl: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: object
    accessToken?: string | null
}

async function baseHttpFetchAsync<T>(params: HttpFetchParams): Promise<T> {

    try {
        // console.log('HTTP HttpFetchParams', params);

        const url = `${params.baseUrl}${params.endpoint}`;

        const customHeaders: Record<string, string> = {'Content-Type': 'application/json'};
        // console.log('HTTP customHeaders', customHeaders);

        if (params.accessToken){
            customHeaders["Authorization"] = `Bearer ${params.accessToken}`
            // console.log('HTTP customHeaders', customHeaders);
        }

        const fetchOptions: RequestInit = {
            method: params.method,
            headers: customHeaders
        };

        if (params.body){
            fetchOptions.body =  JSON.stringify(params.body)
        }

        // console.log('HTTP fetchOptions', fetchOptions);

        const response = await fetch(url, fetchOptions);
        // console.log('HTTP response', response);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        return await response.json() as Promise<T>
    }
    catch (ex) {
        console.error('Failed HTTP request.', ex);
        throw(ex)
    }
}

export async function httpFetchAsync<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: object): Promise<T> {

    const { publicRuntimeConfig } = getConfig();

    const fetchParams: HttpFetchParams = {
        method: method,
        body: method == "GET" ? undefined : body,
        baseUrl: publicRuntimeConfig.API_BASE_URL ?? 'unkonwnBaseUrl',
        endpoint: endpoint,
    }

    return baseHttpFetchAsync(fetchParams);
}
