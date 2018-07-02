# Submission Rationale

## Frontend

#### Tech:
- **React-Redux**: I chose these technologies because I feel that the state-driven approach is great for developing UIs. React is so popular right now that there are plenty of resources and libraries that can help develop and maintain an extensible application. 
- **Superagent**: Superagent provides straightforward and readable HTTP calls that are implemented with JS promises, which make handling responses very simple with Redux Actions.

#### Approach: 
I wrote the frontend in line with what I'd consider to be a really standard React-Redux webapp. The application is seperated up into the directories: *Components*, *Actions* and *Reducers*;

- **Components** contains React Components which displays the UI derived from the Redux State as well as exposing Redux Actions, 
- **Actions** contains Redux Actions which dispatch Reducers to manipulate the Redux State, some of these actions also make use of HTTP requests and handle responses using *Superagent*,
- **Reducers** contains Redux Reducers which define the default state of the application as well as the models which actions update the state.

This follows the Model-View-Controller architecture which provides benefits in easing future development cycle, specifically due to the way that the indivudual components (Components, Actions, Reducers) are very loosely coupled together, meaning that modification of one requires comparatively fewer changes in others.

#### Additional Features:

For the frontend to be considered production-ready, I believe that these issues need to be fixed.
- **Handling Server Errors**: The Rating Modal displays an error when the request could not be completed, however it does not specify the error to the user. This needs to be changed to be informative to users.
- **Monitoring Client Errors**: There is currently no way to respond to an error that has occured on a client instance.
- **General UI Design**: The UI is presentable but would likely need to be redesigned to fit in with any pre-existing applications.

## Backend

#### Tech:
- **Node.js + Express**: Express allows me to instansiate a webserver in two lines of code and then handle as many differnet HTTP requests as I need to. This approach is very maintainable and extensible.
- **Postgres + node-postgres**: Performant database which statisfies the read-write requirements of the application.

#### Approach: 

I used *Express* to develop the backend. The framework allows for HTTP requests to be handled with Javascript objects and promises, meaning that developing a robust API is a very simple task. The structue of the server is:

- **index.js**: The express application containing HTTP request handlers,
- **lib**: A directory containing ancillary functions and classes for the server.

The way that *Express* handles routes is very simple, little more than defining the HTTP method and route;

``` javascript
    const app = express()
    app.post("/app/:route", (request, result) => {
        // do something
    })
```
Because of this, adding new routes in *Express* is effortless. This fact means that further development of the backend will be much simpler for myself and others working to extend it.

*node-postgres* is a Node client for *Postgres*. It handles requests to the Postgres server in a similar fashion to how *Express* handles HTTP requests. 

``` javascript
    const pool = new pg.Pool()
    pool.query("SELECT * FROM users", (err, result) => {
        // do something
    })
```
*Postgres* with *node-postgres* allows the quick development of a robust interface with the database server, and similarly as with *Express*, this means that the development team will have a much easier time maintaining and extending the functionality of the backend.

#### Additional Features:

For the backend to be considered production-ready, These issues need to be fixed:
- **Automation**: Postgres is not setup to automatically start up on new machines (the server must be manually started and the schema must be run manually). 
- **Scalability**: This server can handle a dozen clients, but not thousands and beyond. The best solution for this problem would be to containerize the application and use a system to orchestrate many instances of this container, for example with *Docker* and *Kubernetes*.
- **Security**: Currently, the backend has support for checking that a user is requesting to log in, but there are no authentication checks for any of the other routes. Adding authentication middleware into the *Express* app would allow for this to be solved.

## Other Notes

I included the routes `/login/:userId` and `/content` into the assignment as it did not make sense not to, since the required API calls implied that the client has access to their `userId` and the `contentId` of whatever they are watching. 