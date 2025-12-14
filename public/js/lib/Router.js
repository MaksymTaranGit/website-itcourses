import { HomeView } from '../views/HomeView.js';
import { CatalogView } from '../views/CatalogView.js';
import { DetailsView } from '../views/DetailsView.js';
import { EnrollmentView } from '../views/EnrollmentView.js';
import { itemsService } from '../api/items-service.js';

export class Router {
    constructor() {
        this.appContainerId = 'app-container';
        

        this.routes = {
            '/': HomeView,
            '/courses': CatalogView,
            '/course': DetailsView,
            '/enroll': EnrollmentView
        };

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    async handleRoute() {
        let hash = window.location.hash.slice(1) || '/';
        
        console.log('🔄 Route change:', hash);
        
        let ViewClass = null;
        let params = null;
        //Для статичних адрес типу home або courses
        if (this.routes[hash]) {
            ViewClass = this.routes[hash];
        } 

        //Для адрес з параметрами типу /enroll/1
        else if (hash.startsWith('/course/')) {
            ViewClass = this.routes['/course'];
            params = hash.split('/')[2];
        } 
        else if (hash.startsWith('/enroll/')) {
            ViewClass = this.routes['/enroll'];
            params = hash.split('/')[2];
        }
        
        if (ViewClass) {
            const view = new ViewClass(this.appContainerId);
            
            //Якщо це запит з id 
            if (params) {
                try {
                    const course = await itemsService.getById(params);
                    view.render(course);
                } catch (error) {
                    console.error('Route Error:', error);
                    document.getElementById(this.appContainerId).innerHTML = '<h1>404 - Course Not Found</h1>';
                }
            } else {
                view.render();
            }

            this.updateActiveLink(hash);
            window.scrollTo(0, 0);
            
        } else {
            document.getElementById(this.appContainerId).innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    updateActiveLink(hash) {
        document.querySelectorAll('.nav-link').forEach(link => {

            link.classList.remove('active');

            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });
    }
}