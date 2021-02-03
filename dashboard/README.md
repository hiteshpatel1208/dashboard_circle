# Getting Started with Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

In the project directory, you can run:

#### `npm install`

and then

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To start server goto Server directory and run:

#### `npm install`

and then

#### `npm start`

This will start server on port `8080`.

I have provided proxy setting in `package.json` to resolve CORS issues.

## Listing Screen

Since server returns only one result on each GET call, I'm making repetitive calls till I get 25 transaction details and render them successively.

Most recent transaction always shows on top. Once you make new transaction, after success message from POST call, it shows up on top here.

The search filters on top of the table filters results based on search term that matches to any available property from /GET call response.

## Create Payment Screen

Since POST call only recognise existing users on server, I'm fetching those on load and setting sender and receiver information explicitly.

All user have to do is to input amount, currency and memo (optional as not being validated on server).

On submit user would not have to worry about the 503 error. The code makes repetitive calls untill it gets 201.

I'm leveraging same methods used for id and date creation on server.

## Please note

User would not be able to make any transaction untill listing table has 25 transactions to show.

I timeboxed this chellenge to 5-7 hrs so this dashboard may not be perfect.

I tried my best in allowed time.