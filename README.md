# README

## How to get started

This is a [Turborepo](https://turbo.build/) with two key components:
  - A typescript library for managing LLM prompts in `packages/genai`
  - A [RedwoodJS](https://redwoodjs.com/) demo app in `apps/demo` to
    demonstrate how to use the `genai` library.

To run the end to end app:

```sh
yarn install
```

Then setup a postgres database and create a `.env` file in `apps/demo/` with content like the following:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5434/surface_genai_demo
GENAI_URL=https://some-url.for.surface-fastapi-llm-server.com
```

The default setup assumes `GENAI_URL` is pointing to some running instance
of a [Surface FastAPI LLM
Server](https://github.com/SurfaceData/fastapi-llm-server).

Finally, start the demo with

```sh
yarn run dev
```
