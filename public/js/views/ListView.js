export class ListView {
    constructor(containerId){
        this.container = document.getElementById(containerId);
    }

    createCardHTML(course){
        return `
        <div class="grid-col">
            <article class="course-card-item">
                <img src="${course.img}" alt="${course.title} thumbnail">
                
                <div class="card-body">
                    <h3>${course.title}</h3>
                    
                    <p>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ${course.author}
                    </p>
                    
                    <div class="card-stats">
                        <span>${course.students} users</span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ${course.rating}
                        </span>
                    </div>
                    
                    <a href="#/course/${course.id}" class="btn-details">
                        View Details
                    </a>
                </div>
            </article>
        </div>
        `;
    }

    render(items){
        if(!this.container) return;

        this.container.innerHTML = '';

        if(items.length === 0){
            this.container.innerHTML = '<p style="text-align:center; width:100%">No courses found.</p>';
            return;
        }

        const html = items.map(course => this.createCardHTML(course)).join('');
        this.container.innerHTML = html;
    }


}