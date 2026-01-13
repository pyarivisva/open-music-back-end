# Open Music API - Back-End Service

A robust RESTful API for a music management application built with **Hapi.js** and **PostgreSQL**. This project focuses on clean architecture by implementing a modular plugin system, ensuring high maintainability and scalability.

## 📑 Project Overview

The Open Music API allows users to manage a collection of songs and albums. It is designed as a backend service that provides standardized JSON responses for frontend consumption.

### Problem
Managing music data manually or through a monolithic structure can lead to complex codebases that are difficult to debug, test, and update as the application grows.

### Solution
This project solves management complexity by utilizing a **Decoupled Plugin Architecture** within the Hapi.js framework. By separating concerns into distinct plugins (e.g., Songs, Albums), each module can be developed and maintained independently without affecting the core server logic.

## 🛠 Tech Stack

* **Runtime Environment**: Node.js
* **Framework**: Hapi.js
* **Database**: PostgreSQL
* **Security**: JWT (JSON Web Token) for Authentication & bcrypt for hashing
* **Validation**: Joi (Hapi's schema validation)
* **Error Handling**: Boom (HTTP-friendly error objects)

## 🏗 Modular Architecture (Hapi Plugins)

The backend is built using a plugin-centric approach. Why is it separated?
* **Separation of Concerns**: Each functionality (Songs, Albums, Authentications) has its own directory containing routes, handlers, and validators.
* **Scalability**: New features can be added as isolated plugins without rewriting the core server configuration.
* **Testability**: Individual plugins can be tested in isolation to ensure logic accuracy.

## 🔧 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)

### 2. Installation
```bash
git clone [https://github.com/pyarivisva/open-music-back-end.git](https://github.com/pyarivisva/open-music-back-end.git)
cd open-music-back-end
npm install
