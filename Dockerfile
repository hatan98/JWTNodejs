# Sử dụng Node.js phiên bản mới
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu layer cache
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .


# Chạy server
CMD ["node", "server.js"]