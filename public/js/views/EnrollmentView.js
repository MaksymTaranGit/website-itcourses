import { itemsService } from '../api/items-service.js';

export class EnrollmentView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(course) {
        if (!this.container) return;

        this.container.innerHTML = `
            <main>
                <div class="container">
                    <div class="enrollment-wrapper">
                        
                        <h1 data-i18n-key="enroll.title">Course Enrollment</h1>
                        
                        <p class="enroll-course-name">
                            Enroll in: <strong>${course.title}</strong>
                        </p>

                        <form class="enrollment-form" id="enrollment-form">
                            <!-- Приховане поле ID додається програмно в об'єкт даних, 
                                 але можна залишити його тут, якщо зручніше збирати FormData -->
                            <input type="hidden" name="courseId" value="${course.id}">

                            <div class="form-group">
                                <label for="name">Name <span>*</span></label>
                                <input type="text" id="name" name="name" placeholder="Name Surname" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Email <span>*</span></label>
                                <input type="email" id="email" name="email" placeholder="student@email.com" required>
                            </div>

                            <div class="form-group">
                                <label for="phone">Phone (optional)</label>
                                <input type="tel" id="phone" name="phone" placeholder="+380445354398">
                            </div>

                            <button type="submit" class="btn btn-submit">
                                Submit Enrollment
                            </button>
                        </form>

                        <div class="enrollment-links">
                            <a href="#/course/${course.id}">Back to Course</a>
                            <a href="#/courses">Back to all Courses</a>
                        </div>

                    </div>
                </div>
            </main>
        `;
        this.attachEvents(course);
    }

    attachEvents(course) {
        const form = document.getElementById('enrollment-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                data.date = new Date().toISOString();

                try {
                    await itemsService.createEnrollment(data);
                    this.showSuccess(data.name);
                } catch (error) {
                    alert('Error submitting form');
                }
            });
        }
    }

    showSuccess(name) {
        const wrapper = this.container.querySelector('.enrollment-wrapper');
        if (wrapper) {
            wrapper.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 40px 20px;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; display: inline-block;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h2 style="margin-bottom: 10px; font-family: 'Inter', sans-serif; font-size: 2rem;">Thank You, ${name}!</h2>
                    <p style="color: #666; margin-bottom: 30px; font-family: 'Roboto', sans-serif;">Your application has been received.</p>
                    <a href="#/courses" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; text-decoration: none;">Back to Courses</a>
                </div>
            `;
        }
    }
}