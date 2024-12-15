
# Assignment

# E-Commerce API

## Project Overview

This is a backend API for an E-commerce platform built using **NestJS** and **PostgreSQL**. The API provides functionality to manage products, categories, and orders.

## Features

- **Product Management**: Create, read with search & pagination, update, and delete products.
- **Category Management**: Create, read with search & pagination, update, and delete product categories.
- **Order Management**: Create orders with products & stock update, calculate total price, and update order status, read with pagination

## Technology Stack

- **NestJS**: Framework for building scalable APIs.
- **PostgreSQL**: Relational database for storing product, category, and order data.
- **TypeORM**: ORM for managing PostgreSQL interactions.
- **class-validator** & **class-transformer**: Validation and transformation of incoming request data.
- **Docker**: Containerization for easy deployment.

## Requirements

- Node.js (>= 16.x)
- PostgreSQL (locally or using Docker)
- Docker (optional for containerization)

## Database Design

The database consists of three main tables:

1. **Products**:
   - `id` (UUID): Unique identifier
   - `name` (String): Product name
   - `description` (String): Product description
   - `price` (Decimal): Product price
   - `stockQuantity` (Integer): Available stock quantity
   - `categoryId` (Foreign Key): Reference to the product category

2. **Categories**:
   - `id` (UUID): Unique identifier
   - `name` (String): Category name
   - `description` (String): Category description

3. **Orders**:
   - `id` (UUID): Unique identifier
   - `customerName` (String): Name of the customer
   - `customerEmail` (String): Email of the customer
   - `products` (Array): Product IDs and quantities ordered
   - `totalPrice` (Decimal): Total order price (calculated dynamically)
   - `status` (String): Order status (Pending, Shipped, Delivered)
   - `createdAt` (Timestamp): Date and time of order creation
   - `updatedAt` (Timestamp): Date and time of order update

## Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ShahrearKabir/e-commerce-assignment.git
cd e-commerce-assignment




## Installation

Clone repository
```bash
https://github.com/ShahrearKabir/questionpro-assignment.git
```
Install with npm

```bash
# go to project dir

$ cp .env.example .env
$ npm install

# set all .env variables
```
Setup application .env file
```bash
NAME=e-commerce
RUN_TIME=local
PORT=****

POSTGRES_DB_HOST=localhost
POSTGRES_DB_NAME=e_commerce_assignment_db
POSTGRES_DB_USER=********
POSTGRES_DB_PASSWORD=******
POSTGRES_DB_PORT=5432


```

## Database backup
restore db from *.sql 
```bash
backups/e-commerce-db-backup.sql
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debugger mode
$ npm run start:debug

# production mode
$ npm run start:prod
```
    
## API Reference

#### Postman API documentation url

```https
  https://lively-desert-552765.postman.co/workspace/My-Workspace~0bc29b2d-d286-453e-896f-14302d6241ad/collection/8038379-028c32a5-ecd7-4be6-b122-11a478d3c58f?action=share&creator=8038379

Postman Collections in project backup:
backups/e-commerce-assignment.postman_collection.json
```


