# Nest js

## First you must install the package with the following command 
	
- `npm i -g @nestjs/cli`

## Or if you do not want install global dependencies, uou can start with the command

- `npx @nestjs/cli new name`


## Create controllers you must run the following command

- `npx @nestjs/cli generate controller name`

- ### The previus command creates a file in a folder with the name specified, to skip that, you can run the following command: 
    
    - `npx @nestjs/cli generate controller name --flat`

# Create a service

## You must execute the following command
- `npx @nestjs/cli s services/products --flat`

# Validate Parameters

## You must install the following dependencies:

- `npm i class-validator class-transformer`

### These dependencies help us to validate data

# Reuse code

## You must install the following dependency:

- `npm i @nestjs/maped-types`

# Config Module

## This is used to configure environment variables(use Dotenv), first of all, you must install the following package:

- `npm i @nestjs/config`

## After you install that package, you have to create the .env file to save your environment variables (Remember to ignore this file in your repository)

## After you have created that .env file, in the file app.module, you have to import that package;

- `import { ConfigModule } from "@nestjs/config" `

## After import the package, we have to import that in the imports of the module:

- `@Module({ imports: [UsersModule,ProductsModule,HttpModule, DatabaseModule,ConfigModule.forRoot({envFilePath: ".env",isGlobal: true,}),],})`


## To use that, you have to import the service:

- `import { ConfigService } from "@nesjs/config"; `

## The next step is instance the import in the constructor of the service:

- `constructor(private productsService: ProductsService, private configService: ConfigService) {}`

## And it's really simple to use, you only get the variables of the following way: 

- `this.configService.get("HERE GOES THE NAME OF THE VARIABLE INSTANCED IN THE .ENV FILE THAT YOU WANT TO GET")`

# Automatic Documentation with Swagger

## You must install the packages to use Swagger UI:

- `npm i @nesjs/swagger swagger-ui-express`

## In the main.ts file you must import the following modules from `@nestjs/swagger`:

- `import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';`

## In the config before the `await app.listen(port number)`, you must add the following document configuration:

- `const config = new DocumentBuilder().setTitle("API").setDescription("Platzi Store").setVersion("1.0").build();`

## After stablish the config of the document Builder you must configure the Swagger module:

- `const document = SwaggerModule.createDocument(app, config);`

## And at the end you must setup the Swagger Module with the previus stablished config:

- `SwaggerModule.setup("docs", app, document);`