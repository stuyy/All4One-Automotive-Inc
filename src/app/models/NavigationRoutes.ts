export interface Route {
    name: string; // Name of route
    url: string; // Url of route
    protected: boolean; // Whether the route is a protected route.
    authorized: boolean; // If the user is authorized
    childRoutes?: Array<Route>;
}

export const NavigationRoutes : Array<Route> = [
    { name: 'Home', url: '/', protected: false, authorized: false },
    { name: 'Careers', url: '/careers', protected: false, authorized: false },
    { name: 'Jobs', url: '/jobs', protected: false, authorized: false, childRoutes: [
    ] },
    { name: 'Dashboard', url: '/dashboard', protected: true, authorized: false },
    { name: 'Settings', url: '/settings', protected: true, authorized: false },
    { name: 'Logout', url: '/logout', protected: true, authorized: false }
]
