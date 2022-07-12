# Installation

After cloning this repo you have to run the following commands:

```bash
> npm install
> npm run dev
```
It will show you in which port the SPA is running. (it is often in port 3000)

```bash
  vite v2.9.14 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 470ms.
```

# Folder structure convention

> With this folder structure convention, I aim to follow good practice splitting a react application

```
  ├── api                     # functions which handle asynchronous and deal with API calls
  ├── components              # all your components should be placed here
  ├── reducers                # You will probably need some generic reducers. e.g fetchReducers
  ├── utils.ts                # functions you can share these accross application
```

# UI Acceptance Criteria
An UI should be developed using React that allows the user to:
- List the latest launches - Done
- Search a launch by name - Done
- Inspect a specific launch detail - Not Done
- Add a launch to the favorite list (use local storage) - Done