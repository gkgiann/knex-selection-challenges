import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyMultipart } from "@fastify/multipart";

import { uploadRoutes } from "./routes/upload/upload.routes";
import { deputyRoutes } from "./routes/deputy/deputy.routes";
import { expenseRoutes } from "./routes/expense/expense.routes";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.register(fastifyMultipart, {
  limits: {
    fileSize: 50000000, // 50MB
  },
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Local server",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(uploadRoutes);
app.register(deputyRoutes);
app.register(expenseRoutes);

app.get("/", async (req, reply) => {
  return reply.status(200).send({
    message: "API is running",
    docs: "http://localhost:3333/docs",
  });
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server listening on port 3333");
  });
