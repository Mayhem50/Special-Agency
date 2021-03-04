import { Router } from '@vaadin/router';
import '../pages/home-page';
import '../pages/app-page';
import { AuthGuard } from './auth-guard';
const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
    { path: '/', component: 'home-page' },
    {
        path: '/app',
        component: 'app-page',
        action: (context, commands) => {
            return AuthGuard.navigate(context, commands, '/');
        },
    },
]);
export default router;
//# sourceMappingURL=router.js.map