import { serve } from "bun";
import index from './index.html'
import { ContactRoutes } from "./routes/ContactRoute";

const server = serve({
     port: 4000,
  routes: {
    "/*": index,
     ...ContactRoutes
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});
console.log(`Server running at ${server.url}`);
//  user    User  @relation(fields: [userId], references: [userId] , onDelete: Cascade, onUpdate: Cascade)
