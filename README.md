# Frontend Local Build
```
cd frontend
nvm use # or 'nvm install 20' followed by 'nvm use 20' if you dont have node 20 installed
npm install
npm run dev
```

# Backend Local Build
```
cd chat-api
nvm use # or 'nvm install 20' followed by 'nvm use 20' if you dont have node 20 installed
npm install
npm run dev
```

# Backend Mock Local Build
```
cd mock-chat-api
nvm use # or 'nvm install 20' followed by 'nvm use 20' if you dont have node 20 installed
npm install
npm run dev
```

# Run Redis Locally on Ubuntu
```
sudo apt update
sudo apt install redis-server
sudo service redis-server start
redis-cli ping # must return PONG
```