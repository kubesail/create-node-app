import { ResolverParams } from 'types/HapiRoutes';

export const healthRouteResolver = ({request, h}: ResolverParams) => {
    return h.response('success')
}
