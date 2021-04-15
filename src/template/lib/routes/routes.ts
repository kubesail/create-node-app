import { healthRouteResolver } from 'lib/routes/health';

export const routes = [
    {
        method: 'GET',
        path: '/health',
        options: {
            handler: healthRouteResolver,
            tags: ['api', 'health'],
            description: 'Service Health Check'
        }
    }
];
