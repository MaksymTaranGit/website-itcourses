export class DetailsView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(course) {
        if (!this.container) return;
        const html = `
            <section class="course-hero-section">
                <div class="container">
                    <div class="course-hero-wrapper">
                        <div class="course-image">
                            <img src="${course.img}" alt="${course.title} cover">
                        </div>
                        <div class="course-info">
                            <h1>
                                ${course.title}: <br> 
                            </h1>
                            <p>${course.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="course-details-section">
                <div class="container">
                    <div class="details-layout">
                        <div class="course-main-content">
                            
                            <div class="overview-block">
                                <h2>Overview</h2>
                                <p>${course.overview}</p>
                            </div>

                            <div class="learning-block">
                                <h2>What you’ll learn</h2>
                                <ol class="learning-list">
                                    ${this.renderList(course.whatYouWillLearn)}
                                </ol>
                            </div>

                            <div class="content-block">
                                <h2>Course content</h2>
                                <p>This course includes ${course.lessons ? course.lessons.length : 0} lessons:</p>
                                <ol class="lessons-list">
                                    ${this.renderList(course.lessons)}
                                </ol>
                            </div>

                            <div class="requirements-block">
                                <h2>Requirements</h2>
                                <ul class="requirements-list">
                                    ${this.renderList(course.requirements)}
                                </ul>
                            </div>

                        </div>

                        <aside class="course-sidebar">
                            <div class="enrollment-card">
                                <div class="price-block">
                                    <span class="current-price">$${course.price}</span>
                                    <span class="old-price">$${course.oldPrice}</span>
                                </div>

                                <a href="#/enroll/${course.id}" class="btn btn-enroll">
                                    Enroll Now
                                </a>

                                <ul class="course-features-list">
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>${course.duration} duration</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                                        <span>${course.level} level</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <span>Certificate of completion</span>
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        <span>Average rating: ${course.rating}</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        `;

        this.container.innerHTML = html;
        window.scrollTo(0, 0);
    }

    renderList(items) {
        if (!items || items.length === 0) return '';
        return items.map(item => `<li><span>${item}</span></li>`).join('');
    }
}