# A Simple React Frontend
##  Setup
*For the following commands your terminal's working directory has to be that of the frontend.
If you're still in the project's root directory use `cd frontend` to change your cwd.*

If you have Node already installed simply run `npm i` to install all the dependencies.  
Then to run `npm run start` to run the frontend.

## Developing
If you wish to develop the frontend in conjunction with the API. You'll need to deal with CORS. If you're using a chromium browser simply add ` --disable-web-security` as a flag to disable CORS protections (it is recommended to only use this flag while developing this app).

Another way would be to enable CORS on the API, please do not push with CORS enabled on the API.