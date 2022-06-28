Linco
===

> Simple URL shortener service

### Setup

##### clone repo

```
❯ git clone https://github.com/frenchbread/linco
```

### Backend

##### navigate to `linco-backend` dir

```
❯ cd ./linco-backend
```

##### add `.env` file or rename `.env-template`

```
❯ mv .env-template .env
```

##### start docker container

```
❯ docker-compose up
```

This will start mongodb and backend app on ports `27017` and `8080`.

### Frontend

In second terminal tab, navigate to `linco-frontend` folder.

```
❯ cd ./linco-frontent
```

##### add `.env` file or rename `.env-template`

```
❯ mv .env-template .env
```

##### install dependencies

```
❯ yarn
```

##### start frontend app

```
❯ yarn run serve
```

This will start frontend app on port `3030`.
