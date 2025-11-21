const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


const coursesData = [
        {
            id: 1,
            title: 'Python for Beginners',
            author: 'Walter White',
            rating: 4.9,
            students: '1.9k',
            img: '/images/python-course.png',
            category: 'Backend',
            level: 'Beginner',
            description: 'Python for Beginners: From Zero to Hero. Learn Python programming with simple explanations and interesting tasks in this course!',
            price: 19.99,
            oldPrice: 49.99,
            duration: '12 hours',
            overview: `This course is designed to introduce you to the basics of Python programming. You will start with fundamental concepts and gradually build up your skills to create simple programs and solve famous problems. Whether you’re a complete beginner or have some coding experience, this course will help you gain solid skills in Python.`,
            whatYouWillLearn: [
                'Program development concepts in Python',
                'How to use Pycharm to make Python programs',
                'Understand computer science concepts such as flow control and functions',
                'Python decisions and looping'
            ],
            lessons: [
            'Introduction',
            'Python Basics',
            'Strings Part 1',
            'Functions',
            'Flow control',
            'Introduction to loops',
            'Strings Part 2',
            'Lists',
            'Dictionaries',
            'Tuples',
            'Sets'
            ],
            requirements: [
            'Computer',
            'Access to the Internet',
            'An interest in learning Python',
            'High level of proficiency in English because of the technical language used in some of the lecture videos',
            'Basic math knowledge: addition, subtraction, multiplication, division, knowledge of types of numbers such as integers and decimal numbers, exponentiation, etc.'
            ]
        },
        {
            id: 2,
            title: 'Basics of HTML',
            author: 'Jesse Pinkman',
            rating: 4.9,
            students: '1.49k',
            img: '/images/html-course.png',
            category: 'Frontend',
            level: 'Beginner',
            description: 'Master the building blocks of the web. Create structure for your websites with semantic HTML5 tags.'
        },
        {
            id: 3,
            title: 'Cybersecurity Basics',
            author: 'Laura Scott',
            rating: 4.6,
            students: '1.45k',
            img: '/images/cybersecurity-course.png',
            category: 'Cybersecurity',
            level: 'Intermediate',
            description: 'Learn how to protect systems and networks. A comprehensive introduction to the world of cybersecurity.'
        },
        {
            id: 4,
            title: 'Fundamentals of C++',
            author: 'James Smith',
            rating: 4.8,
            students: '1.4k',
            img: '/images/c++-course.png',
            category: 'Development',
            level: 'Advanced',
            description: 'Dive deep into C++. Understand memory management, pointers, and object-oriented programming.'
        },
        {
            id: 5,
            title: 'Data Science Basics',
            author: 'Emma Davice',
            rating: 4.5,
            students: '1.4k',
            img: '/images/datascience-course.png',
            category: 'Data Science',
            level: 'Beginner'
        },
        {
            id: 6,
            title: 'Game Development',
            author: 'Daniel Taylor',
            rating: 4.6,
            students: '1.3k',
            img: '/images/gamedev-course.png',
            category: 'GameDev',
            level: 'Beginner'
        },
        {
            id: 7,
            title: 'AI for Programming',
            author: 'Peter Parker',
            rating: 4.1,
            students: '1.4k',
            img: '/images/ai-course.png',
            category: 'AI',
            level: 'Beginner'
        },
        {
            id: 8,
            title: 'QA Begginer Course',
            author: 'Sophia Anderson',
            rating: 4.8,
            students: '1.5k',
            img: '/images/qa-course.png',
            category: 'QA',
            level: 'Beginner'
        }
    ];

app.get('/', (req, res) => {
    res.render('index', {
        pageTitle : 'Discendi: Home'
    });
});

app.get('/courses', (req, res) => {
    res.render('courses', { 
        pageTitle: 'Discendi: Courses List',
        courses: coursesData 
    });
});

app.get('/course/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = coursesData.find(c => c.id === courseId);
    if(!course){
        return res.status(404).send('Course is not found!');
    }

    res.render('course-details', {
        pageTitle : 'Discendi: Course Details',
        course: course
    });
});

app.get('/enroll/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = coursesData.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send('Course is not found!');
    }

    res.render('enrollment', { 
        pageTitle: 'Discendi: Enrollment',
        course: course 
    });
});

app.listen(port, () => {
    console.log(`Сервер успішно запущено на http://localhost:${port}`);
});