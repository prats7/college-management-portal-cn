# College Management App

Deployed on Heroku : https://college-m-portal.herokuapp.com

### DESCRIPTION

College Management app is a full stack MERN application with React-redux client side and nodejs in backend, MongoDB is used for database , In this app a teacher can give and check submitted assignment by the user and student can see upcoming assignment and upload pdf and submit assignment and see their marks given by teacher.

---

### USING THE APPLICATION

- You can start the app concurrently both server and client using command : npm run dev .

- You can start app in backend development mode using command : npm run server .

- You can start app in backend production mode using command : npm start .

  - **Register**

    - Click on Register button.
    - Register as a Teacher or Student.

  - **Login**

    - Click on Login button.
    - Login as Teacher or Student.

  - **Dashboards (Seperate for Student and Teacher)**

    - Teacher’s dashboard

      - Two tabs for Upcoming assignment and Submitted assignment.
      - Only Teacher will be able to add and delete assignments in upcoming assignment.
      - Add assignments click on add button .
      - In submitted assignment tab teacher can see seperate card of each students with assignment details and link submitted by the student.
      - Teacher can view pdf file using link and give marks to each student.

    - Student Dashboard
      - Two tabs for Upcoming assignment and Submitted assignment.
      - In upcoming assignment tab student can have access to assignments with Teacher Name and Subject.
      - Student can submit assignment and upload pdf file which will show in submit assignment tab.
      - In submit assignment tab student can delete his submitted assignment and see their marks given by teacher.

  - **Profile Page**
    - In Navbar profile page will be access by clicking on user name
      - User can update name and password there.
  - **Logout**
    In navbar clicking on logout button will logout user to dashboard.

---

### LANGUAGES/FRAMEWORKS/TECHNOLOGIES

|                         |                          |
| ----------------------- | ------------------------ |
| **Frontend**            | React; Redux; reactstrap |
| **Server**              | Node.js; Express.js;     |
| **Database**            | MongoDB; Mongoose        |
| **User Authentication** | jsonwebtoken; bcryptjs   |
| **Other Dependencies**  | Concurrently; axios;     |

---

### AUTHOR:

Pratyush Vishal - [GitHub](https://github.com/prats7)
