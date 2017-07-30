# TaskBuddy <img height="100px" src="./public/taskbuddy.png" target_blank />

**TaskBuddy**, is a task manager with a built in reward system. This web application was built as the capstone project during my time at a 6 month web immersive program. The back-end was built using Node, Express and PostgreSql. The front-end was built using React and React-Bootstrap. The front-end repo lives here https://github.com/bettymariam/TaskBuddyFrontEnd

The companion Alexa skill was built using AWS Lambda and Alexa developer console. At this point, the Alexa skill has not been published and lives in my developer account for demo purposes only.


## Setup

To run TaskBuddy locally :

1. Fork and clone the repo.

2. Run NPM Install

3. Create a postgresql database called k9kicks
  ```
  createdb tasks_db
  ```
4. Run migration files
  ```
  npm run knex migrate:latest
  ```
5. Run seed files
  ```
  npm run knex seed:run
  ```
6. Start the servers

  * Express server can be started with :
  ```
  npm start
  ```
  * React server can be started with :
  ```
  npm start
  ```
7. In a browser navigate to:
  ```
  localhost:3002
  ```
