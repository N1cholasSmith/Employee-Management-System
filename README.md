<img alt="GitHub followers" src="https://img.shields.io/github/followers/N1cholasSmith?style=social">     <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/N1cholasSmith/horiseon-search-engine-optimization?style=social">     <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/N1cholasSmith/horiseon-search-engine-optimization?style=social">


# Employee-Management-System

---
## Table of Contents
- [Description] (#Description)
- [Technologies-Used] (#Technologies-Used)
- [Installation] (#Installation)
- [Usage] (#Usage)
- [Credits/Contributors] (#Credits/Contributors)
- [Future-Development] (#Future-Development)
- [How-to-Contribute] (#How-To-Contribute)
- [License] (#License)

---
## Description
The Employee Management System is used to dynamically navigate through your companies database. A command line Content Management System interface allows the user to view the companies departments, roles and employees whilst offering the ability to manipulate the information in the database.

https://user-images.githubusercontent.com/88865022/142196237-3fa7b3e5-c143-49f1-83ad-5287cc8de87e.mp4

---
## Technologies-Used
- Node.js
- Inquirer
- MySQL
- Console.table

---
## Installation

1. Clone this repository to your local machine.
2. Open the file on Visual Studios Code (VScode) 
3. Ensure you have the most up to date Node.js
4. Enter your MySQL login details into the .env.EXAMPLE file and rename to .env
5. In the VScode terminal, login to your MySQL with the following commands
    - mysql -u root -p
    - use company_db;
    - source ./db/schema.sql;
    - source ./db/seeds.sql;
    - quit;
6. MySQL is now set up to use the Companies Database and the information detailed within.
5. run the following in your integrated VScode terminal to
    - npm install
    - node server.js
7. Navigate through the Prompts in the VScode Terminal
8. ENJOY!!

---
## Usage
To navigate through your databases Departments, Roles and Employees simply follow the prompts after you have followed the installation details to view, add or amend information held within the database.

---
## Credits/Contributors
- Nicholas Smith: Full Stack Web Developer & LSATA Aircraft Technician Royal Australian Navy

---
## Future-Development
- Add more functionality to the database such as deleting, 
- Expanding the capability and information it can hold with more fields
- Add a front end for a more user friendly experience 

---
## How to Contribute

Please refer to link for guidelines & Contributor Covenant Code Of Conduct [NoteTaker](https://www.contributor-covenant.org/)

---
## License
MIT License

Copyright (c) [2021] [NoteTaker]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
