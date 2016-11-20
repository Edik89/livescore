# livescore

### Installation
Clone or download this repo 
```
https://github.com/Edik89/livescore.git
```
Run a Command in console: 
```shell
cd livescore-master
npm install # install dependencies in the main folder
npm start # run the application on port 3000
``` 

Open your browser `http://localhost:3000/graphql` 
and copy id
![alt text](https://pp.vk.me/c638826/v638826770/125fd/VQcC4fyv-GA.jpg)
this id inserted to (frontend/app/routes/Router.jsx)
 ```js
 static queries = {
    viewer: () => Relay.QL`query{
        node(id: "TGl2ZXJlc3VsdDo1ODFhYTY2NzFiODk3MDFiOGI0N2QyM2U=")
    }`
  };
```
and watch ```http://localhost:3000/```
