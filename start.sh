#!/bin/bash
cd backend && npm install && npx sequelize-cli db:migrate &
cd frontend && npm install &
wait
npm start --prefix backend & npm start --prefix frontend