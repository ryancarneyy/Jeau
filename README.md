# Objective

- Used to hold a full mysql database with a users table, and use cookies to authorize permissions to certain users

# Setup

## backend

1. cd backend
2. npm install
    - This is in order to install all dependencies needed within the project
3. Set up .env file
    1. Make file named .env
    2. Set up evnironment variables variables  
        - MYSQL_PASS='your_mysql_root_password'
            - string: password to your mysql root user
        - MYSQL_DB_NAME='your_database_name'
            - string: name of your database
        - JWT_KEY=random_generated_token_key
            - plain text: randomly generated key for json web token
        - PORT=port_#
            - plain text: # of the port in which your server runs on

## frontend

1. cd frontend
2. npm install



# Starting server

1. cd backend
2. npm start

# Starting frontend

1. cd frontend
2. npm start


