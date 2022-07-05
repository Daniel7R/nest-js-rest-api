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