import { SwaggerDefinition, Options } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Chungmu Salmon API Server",
    version: "1.0.0",
    description: "충무연어 API 엔드포인트 문서입니다.",
  },
  basePath: "/",
  schemes: ["http"],
  contact: {
    name: "Junyoung Yang",
    email: "tom9744@gmail.com",
  },
};

export default {
  swaggerDefinition,
  apis: ["./src/model/*.ts", "./src/routes/*.ts"], // files containing annotations as above
} as Options;
