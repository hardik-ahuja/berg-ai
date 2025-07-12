# Jarvis Vector Chat

A full-stack AI chatbot system that integrates a custom vector database with modern retrieval-augmented generation (RAG) capabilities. This project demonstrates an end-to-end RAG pipeline using a Node.js backend, a Python-based vector database, and a responsive React frontend.
This system allows users to interact with an intelligent assistant that can answer questions based on a set of documents, leveraging vector embeddings for efficient similarity search.

---
![Screen Shot of App](image.png)

## Demo
[![Watch the demo](https://img.youtube.com/vi/_gkILq7J7Bk/0.jpg)](https://www.youtube.com/watch?v=_gkILq7J7Bk)


### Chat Application
- Responsive UI built with React
- Real-time interactions with an intelligent assistant
- Fully functional on both desktop and mobile devices

### Backend
- Express-based Node.js server
- Handles embedding, vector search, and response generation
- Clean modular structure with API routes:
  - `/insert`: Accepts new documents and embeds them
  - `/search`: Performs top-k dot product similarity search
  - `/query`: RAG-based query answering

### Vector Database
- Simple Python implementation with flat index
- Embeddings stored in-memory or on disk (JSON)
- Supports single and batch insertions
- Efficient top-k dot product similarity search

---


---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.9+
- `pip` and `virtualenv`
- `npm` or `yarn`

---

### Installation

cd backend
npm install

cd vector_db
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cd frontend
npm install