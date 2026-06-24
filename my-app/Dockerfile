FROM node

WORKDIR /usr/src/app/my-app

# 1. Copy แค่ package.json เข้ามาก่อนเพื่อติดตั้ง library
COPY package*.json ./

RUN npm install
RUN npm install react-router-dom
RUN npm install recharts

# 2. เปิดบรรทัดนี้ เพื่อ Copy โค้ดทั้งหมด (รวมถึงโฟลเดอร์ src, public) เข้ามาใน Docker
# (เอาเครื่องหมาย # ออก และแนะนำให้ใช้บรรทัดนี้ครับ)
COPY . ./

CMD ["npm", "start"]