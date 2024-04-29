<!-- markdownlint-disable no-inline-html -->
<!-- markdownlint-disable first-line-heading  -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/codybennett/LIS4613-Final-Project">
    <img src="Testing Screenshot.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">LIS4613-Final-Project</h3>

  <p align="center">
    Final Project for University of Oklahoma LIS4613 Dynamic Web Development
    <br />
    <a href="https://github.com/codybennett/LIS4613-Final-Project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/codybennett/LIS4613-Final-Project">View Demo</a>
    ·
    <a href="https://github.com/codybennett/LIS4613-Final-Project/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/codybennett/LIS4613-Final-Project/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This project aims to guide students through the development of a dynamic website using Node.js with an Express framework and MySQL for database management. The website should implement basic CRUD (Create, Read, Update, Delete) functionalities within a secure environment, safeguarding against common web vulnerabilities such as SQL Injection and Cross-Site Scripting (XSS) attacks. The project will be limited to the use of three tables within the MySQL database and should include at least two forms for data input. Students will be required to create a master page (template) to ensure consistent layout and styling across the website.

### Tasks

1. Setup and Initial Configuration: Set up Node.js, MySQL, and any other necessary development tools. Create a basic project structure.

2. Database Design and Implementation: Design a MySQL database schema limited to three tables. Implement the schema in MySQL.

3. Backend Development:

    * Implement server-side logic using Node.js and Express.
    * Develop CRUD operations for the database tables.

4. Frontend Development:

    * Design and implement a master page for a consistent look and feel.
    * Create at least two forms for data input (e.g., adding and editing records).

5. Security Measures:

    * Implement measures to prevent SQL Injection and XSS attacks.

6. Testing: Test the website thoroughly to ensure functionality and security measures are in place.

7. Documentation: Document the project including the design choices, setup instructions, and user guide.

### Simple Rubric

* Project Setup (10%): Completion of initial setup and project structure.
* Database Design (20%): Logical and efficient database schema, implementation in MySQL.
* CRUD Functionality (30%): Full implementation of CRUD operations, code quality.
* Security (20%): Effective implementation of security measures against SQL Injection and XSS.
* Master Page and Forms (10%): Consistent design using a master page, functional forms for data input.
* Documentation (10%): Clarity, completeness, and quality of documentation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

A MySQL database is required for the application. See provided inventory_init.sql file for an example schema.

There are many NPM packages that need to be installed; this can be done via To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/codybennett/LIS4613-Final-Project.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Enter your backend details in `.env`

   ```properties
    APP_PORT = 3000
    DB_PORT = 3306
    DB_HOST = localhost
    DB_USER = <User to access database and create tables>
    DB_PASS = <password>
    MYSQL_DB = inventory
    SESS_LIFETIME = TWO_HOURS
    SESS_NAME = '<name for session managment>'
    SESS_SECRET = '<secret for session management>'
   ```

4. Initialize database

   ```sh
   mysql < inventory_init.sql
   ```

5. Start ExpressJS Server

   ```sh
    node server.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Cody Bennett - [LinkedIn](https://linkedin.com/in/cody-bennett-2087467b) - <codybennett@ou.edu>

Project Link: [https://github.com/codybennett/LIS4613-Final-Project](https://github.com/codybennett/LIS4613-Final-Project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/codybennett/LIS4613-Final-Project.svg?style=for-the-badge
[contributors-url]: https://github.com/codybennett/LIS4613-Final-Project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/codybennett/LIS4613-Final-Project.svg?style=for-the-badge
[forks-url]: https://github.com/codybennett/LIS4613-Final-Project/network/members
[stars-shield]: https://img.shields.io/github/stars/codybennett/LIS4613-Final-Project.svg?style=for-the-badge
[stars-url]: https://github.com/codybennett/LIS4613-Final-Project/stargazers
[issues-shield]: https://img.shields.io/github/issues/codybennett/LIS4613-Final-Project.svg?style=for-the-badge
[issues-url]: https://github.com/codybennett/LIS4613-Final-Project/issues
[license-shield]: https://img.shields.io/github/license/codybennett/LIS4613-Final-Project.svg?style=for-the-badge
[license-url]: https://github.com/codybennett/LIS4613-Final-Project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cody-bennett-2087467b
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[NodeJS-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
