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
```

## 🧪 API Endpoints

## 1. Authentications
Authentication and token management.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/authentications` | No | Login and obtain access & refresh tokens |
| **PUT** | `/authentications` | No | Refresh access token |
| **DELETE** | `/authentications` | No | Logout and revoke refresh token |

---

## 2. Users
User management.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/users` | No | Register a new user |
| **GET** | `/users/{id}` | No | Get user profile by ID |

---

## 3. Songs
Song data management.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/songs` | No | Add a new song |
| **GET** | `/songs` | No | Get all songs |
| **GET** | `/songs/{id}` | No | Get song details by ID |
| **PUT** | `/songs/{id}` | No | Update song data |
| **DELETE** | `/songs/{id}` | No | Delete a song |

---

## 4. Albums
Album management and likes feature.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/albums` | No | Create a new album |
| **GET** | `/albums/{id}` | No | Get album details by ID |
| **PUT** | `/albums/{id}` | No | Update album data |
| **DELETE** | `/albums/{id}` | No | Delete an album |
| **POST** | `/albums/{id}/covers` | No | Upload album cover (multipart/form-data) |
| **POST** | `/albums/{id}/likes` | Yes | Like an album |
| **DELETE** | `/albums/{id}/likes` | Yes | Remove album like |
| **GET** | `/albums/{id}/likes` | No | Get album like count |

> **Note**: Album cover upload has a maximum size of **512 KB**.

---

## 5. Playlists
Playlist management.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/playlists` | Yes | Create a new playlist |
| **GET** | `/playlists` | Yes | Get user playlists |
| **DELETE** | `/playlists/{id}` | Yes | Delete a playlist |

---

## 6. Playlist Songs
Manage songs inside playlists.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/playlists/{id}/songs` | Yes | Add song to playlist |
| **GET** | `/playlists/{id}/songs` | Yes | Get songs in playlist |
| **DELETE** | `/playlists/{id}/songs` | Yes | Remove song from playlist |

---

## 7. Playlist Activities
Track playlist activity history.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/playlists/{id}/activities` | Yes | Get playlist activities |

---

## 8. Collaborations
Playlist collaboration management.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/collaborations` | Yes | Add collaborator to playlist |
| **DELETE** | `/collaborations` | Yes | Remove collaborator from playlist |

---

## 9. Exports
Export playlist data.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/export/playlists/{playlistId}` | Yes | Export playlist to email (queue-based) |

---

> **Note**:  
> Endpoints requiring authentication use the `openmusic_jwt` strategy.  
> Make sure to include the JWT access token in the `Authorization` header.

