## Project Name
STUDENT HUB


## Team members
Setthanant Tetanonsakul 6115269

Ha Ngoc Bao Linh 6138310

Thanyaluck Arunrattanakul 6215301


## Project Description
A web application that will provide students with a centralized platform to access and manage their academic information. Here are some features that will be included in our application:
1. User accounts: Allow students to create accounts on the app so that they can access their own personalized information. 
2. Course schedules: Provide students with a calendar view of their class schedules, including course names, instructors, meeting times, and locations. This could be integrated with your university's course catalog and registration system to ensure that the information is up-to-date.
3. Grades and transcripts: Allow students to view their grades for each course, as well as their cumulative GPA. You may also want to provide access to official transcripts, which can be a useful resource when applying for jobs or further education.

## Pages
1. Login Page - Users can login by Email or USER ID with a password. They can click ``Dont have an account? Sign up`` to create their account.
2. Sign Up Page - Users can sign up by fill in Email, Faculty, First Name, Last Name, Student ID Number, and Password.
3. HomePage - Shows today class and day with subject code, title, time, and Instructor name.
4. Schedule - Shows weekly schedule with time. Also, Instructor details with subjects name and Instructor names.
5. Courses - Shows a search for course code, titles, instructors, times, and dates. Also, Course code, title, instructor, date, time, credit, register, and unregister. Users can choose courses to add.
6. Grade and Transcription - Shows Courses code and name which Users can choose their grades (A+, A, A-,B+, B, B-, C+, C, C-, D+, D, F) to calculate their GPA.
7. User Profile - Shows Name, Student ID, Faculty, Email, GPA, and Credits.

## Data Model
1. Student - Contains student information
2. Courses - Contains course information
3. Registration - Ties Student_ID and Course_ID together
4. Grade - Ties Registration_ID to a score which will dictate their grade


## Tech Stack
 This project is built using the MERN stack but instead of using Express.js to handle to backend we used Next.js to develop both frontend and backend. We deploy this website on Vercel.
 
 1. MongoDB
 
 2. Next.js
 
 3. Node.js
 
 4. React.js
