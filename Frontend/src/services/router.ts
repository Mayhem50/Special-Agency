import { Commands, Context, Router } from '@vaadin/router';
import AuthorizationService from './authorization';
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
    action: (context: Context, commands: Commands) => {
      return AuthGuard.navigate(context, commands, '/');
    },
  },
]);

export default router;
