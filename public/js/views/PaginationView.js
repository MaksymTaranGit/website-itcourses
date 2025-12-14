export class PaginationView {
    constructor(containerId, onPageChange){
        this.container = document.getElementById(containerId);
        this.onPageChange = onPageChange;
    }

    render(totalItems, currentPage, limit){
        if(!this.container) return;

        const totalPages = Math.ceil(totalItems / limit);

        if(totalPages <= 1){
            this.container.innerHTML = '';
            return;
        }

        let html = '';

        if(currentPage > 1){
            html += `<button class="btn-page prev" data-page="${currentPage - 1}">Prev</button>`;
        }

        for(let i = 1; i <= totalPages; i++){
            const activeClass = i === currentPage ? 'active' : '';
            html += `<button class="btn-page ${activeClass}" data-page="${i}">${i}</button>`;
        }

        if(currentPage < totalPages){
            html += `<button class="btn-page next" data-page="${currentPage + 1}">Next</button>`;
        }

        this.container.innerHTML = html;

        this.addEventListeners();
    }

    addEventListeners(){
        const buttons = document.querySelectorAll('.btn-page');
        buttons.forEach(btn => {
            //якщо на кнопку нажали то ми з data-page атрибуту берем номер цієй сторінки і передаєм в callback функцію в app.js
            btn.addEventListener('click', () => {
                const newPage = parseInt(btn.dataset.page);

                if(this.onPageChange){
                    this.onPageChange(newPage);
                }
            });
        });
    }
}