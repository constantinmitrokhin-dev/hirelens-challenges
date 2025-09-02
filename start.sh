#!/bin/bash
cd backend && npm install &
cd frontend && npm install &
wait
npm start --prefix backend & npm start --prefix frontend
