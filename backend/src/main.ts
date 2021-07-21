import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Sungazer challenge")
    .setDescription("Sungazer API challenge")
    .setVersion("1.0")
    .addTag("sungazer")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
