const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoDB = require('./config/mongoDB');

const authRoutes = require('./src/routes/authRoutes');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB 연결
mongoDB();

// Redis 연결 (redisClient를 다른 파일에서 불러와서 사용 가능)

// 라우트 설정
app.use('/api', apiRoutes);
app.use('/', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
