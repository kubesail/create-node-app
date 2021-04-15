import Hapi from '@hapi/hapi';

export interface ResolverParams {
    request: Hapi.Request;
    h: Hapi.ResponseToolkit;
}
