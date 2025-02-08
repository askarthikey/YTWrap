// config/edgestore.config.ts
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  videoFiles: es.fileBucket(),
});

export const { GET, POST } = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export type EdgeStoreRouter = typeof edgeStoreRouter;
