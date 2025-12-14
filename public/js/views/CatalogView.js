import { itemsService } from '../api/items-service.js';
import { ListView } from './ListView.js';
import { PaginationView } from './PaginationView.js';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export class CatalogView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);

        this.queryParams = {
            title_like: '', 
            _page: 1,
            _limit: 9
        };
    }

    async render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <section class="courses-hero" aria-labelledby="catalog-title">
                <div class="container">
                    <div class="hero-content">
                        <h1 id="catalog-title" class="hero-title" data-i18n-key="catalog.hero.title">
                            Explore Our Courses
                        </h1>
                        <p class="hero-subtitle" data-i18n-key="catalog.hero.subtitle">
                            Find the right course for your goals
                        </p>
                        <form class="course-search-form" role="search" onsubmit="return false;">
                            <div class="search-wrapper">
                                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input type="search" name="q" class="search-input" placeholder="Search courses..." aria-label="Search courses" data-i18n-key="catalog.hero.placeholder" value="${this.queryParams.title_like}">
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section class="catalog-section">
                <div class="container">
                    
                    <aside class="catalog-sidebar">
                        <form onsubmit="return false;">
                            <fieldset>
                                <legend>Category</legend>
                                <div id="category-list">
                                    <label><input type="radio" name="category" value="frontend"> Frontend</label>
                                    <label><input type="radio" name="category" value="backend"> Backend</label>
                                    <label><input type="radio" name="category" value="gamedev"> GameDev</label>
                                    <label><input type="radio" name="category" value="web"> Web Development</label>
                                    <label><input type="radio" name="category" value="data"> Data Science</label>
                                    
                                    <label class="extra-category hidden"><input type="radio" name="category" value="security"> Cybersecurity</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="mobile"> Mobile Dev</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="devops"> DevOps</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="design"> UI/UX Design</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="cloud"> Cloud (AWS)</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="blockchain"> Blockchain</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="ai"> AI & ML</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="qa"> QA Testing</label>
                                    <label class="extra-category hidden"><input type="radio" name="category" value="marketing"> Marketing</label>
                                </div>
                                <a href="#" id="toggle-categories" style="font-size: 0.9rem; margin-top: 5px; display: inline-block;">Show more</a>
                            </fieldset>

                            <fieldset>
                                <legend>Difficulty</legend>
                                <div>
                                    <label><input type="radio" name="level" value="beginner"> Beginner</label>
                                    <label><input type="radio" name="level" value="intermediate"> Intermediate</label>
                                    <label><input type="radio" name="level" value="advanced"> Advanced</label>
                                </div>
                            </fieldset>

                             <fieldset>
                                <legend>Duration</legend>
                                <div>
                                    <label><input type="radio" name="durationCategory" value="short"> Short</label>
                                    <label><input type="radio" name="durationCategory" value="medium"> Medium</label>
                                    <label><input type="radio" name="durationCategory" value="long"> Long</label>
                                </div>
                            </fieldset>
                        </form>
                    </aside>

                    <div class="catalog-content">
                        <div class="sort-bar">
                            <span>Sort by:</span>
                            <button type="button" class="btn-sort active">Popularity</button>
                            <button type="button" class="btn-sort">Newness</button>
                            <button type="button" class="btn-sort">Rating</button>
                            <button type="button" class="btn-sort">Price</button>
                        </div>

                        <div class="courses-grid-list" id="courses-container">
                            <div style="width: 100%; text-align: center; padding: 40px;">Loading courses...</div>
                        </div>

                        <div id="pagination-container" class="pagination-bar" style="margin-top: 40px; display: flex; justify-content: center; gap: 10px;"></div>
                    </div>
                </div>
            </section>
        `;

        this.listView = new ListView('courses-container');
        
        this.paginationView = new PaginationView('pagination-container', (newPage) => {
            this.queryParams._page = newPage;
            this.loadCourses();
            document.getElementById('catalog-title').scrollIntoView({ behavior: 'smooth' });
        });

        this.setupEventListeners();
        await this.loadCourses();
    }

    async loadCourses() {
        try {
            const { items, total } = await itemsService.getAll(this.queryParams);

            this.listView.render(items);
            this.paginationView.render(total, this.queryParams._page, this.queryParams._limit);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    setupEventListeners() {
        //SERCH INPUT FORM
        const searchInput = this.container.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((event) => {
                this.queryParams.title_like = event.target.value;
                this.queryParams._page = 1;
                this.loadCourses();
            }, 300));
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') e.preventDefault();
            });
        }

        //FILTERS
        const filterForm = this.container.querySelector('.catalog-sidebar form');
        if (filterForm) {
            filterForm.addEventListener('change', (event) => {
                const target = event.target;
                if (target.type === 'radio') {
                    this.queryParams[target.name] = target.value;
                    this.queryParams._page = 1;
                    this.loadCourses();
                }
            });
        }

        //SORTING
        const sortButtons = this.container.querySelectorAll('.btn-sort');
        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sortButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const sortText = btn.innerText.trim();
                delete this.queryParams._sort;
                delete this.queryParams._order;

                if (sortText === 'Price') {
                    this.queryParams._sort = 'price';
                    this.queryParams._order = 'asc';
                } else if (sortText === 'Rating') {
                    this.queryParams._sort = 'rating';
                    this.queryParams._order = 'desc';
                } else if (sortText === 'Newness') {
                    this.queryParams._sort = 'id';
                    this.queryParams._order = 'desc'; 
                } 
                this.loadCourses();
            });
        });

        // Show more / Show less
        const toggleBtn = this.container.querySelector('#toggle-categories');
        const extraCategories = this.container.querySelectorAll('.extra-category');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isHidden = extraCategories[0].classList.contains('hidden');
                if (isHidden) {
                    extraCategories.forEach(cat => cat.classList.remove('hidden'));
                    toggleBtn.innerText = 'Show less';
                } else {
                    extraCategories.forEach(cat => cat.classList.add('hidden'));
                    toggleBtn.innerText = 'Show more';
                }
            });
        }
    }
}