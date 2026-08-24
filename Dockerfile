FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
COPY . .
ARG REACT_APP_CHART_DATA_URI=http://chart-fields.local
ENV REACT_APP_CHART_DATA_URI=$REACT_APP_CHART_DATA_URI
ENV NODE_OPTIONS="--max_old_space_size=512"
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]