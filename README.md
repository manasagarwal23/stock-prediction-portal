# Stock Prediction Portal

A full-stack web application that predicts stock prices using an LSTM neural network, with a Django REST Framework backend and React.js frontend.

## Overview

Enter any stock ticker supported by Yahoo Finance (with 10+ years of data) and get:
- LSTM-based price predictions trained on 10 years of historical data
- 100-day and 200-day moving average visualisations
- Model evaluation metrics on held-out test data

**Model Performance:** RMSE of $4.99 on Google (GOOG) held-out test data (~3% of mean price), using a temporal 70/30 train-test split.

---

## Tech Stack

**Frontend**
- React.js
- Axios (with request/response interceptors)

**Backend**
- Django REST Framework
- Simple JWT (access + refresh token authentication)
- yFinance (historical data)
- Keras/TensorFlow (LSTM model)
- Matplotlib (plot generation, AGG backend)

---

## Features

- **JWT Authentication** — register, login, logout with access/refresh token workflow
- **Protected Routes** — private and public route handling on the frontend
- **LSTM Prediction** — trained on 10 years of historical price data with a temporal 70/30 split
- **Moving Averages** — 100-day and 200-day MA plots rendered per ticker
- **Error Handling** — loading states, form validation, and API error feedback throughout

---

## Getting Started

### Prerequisites
- Python 3.11

### 1. Clone the repository

```bash
git clone https://github.com/manasagarwal23/stock-prediction-portal.git
cd stock-prediction-portal
pip install -r requirements.txt
```

### 2. Backend Setup

```bash
cd backend-drf

```

Create a `.env` file in the `backend-drf` folder:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
```

```bash
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend-react
npm install
```

Create a `.env` file in the `frontend-react` folder:

```
VITE_BACKEND_BASE_API=http://127.0.0.1:8000/api/v1
VITE_BACKEND_ROOT=http://127.0.0.1:8000
```

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Limitations

- Predictions are based solely on historical price data (no sentiment, fundamentals, or macro signals)
- LSTM models are known to lag at sharp trend reversals
- Not intended for actual trading decisions