# --- Étape 1 : construire l'application avec Node ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# --- Étape 2 : servir les fichiers avec un serveur web léger ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80