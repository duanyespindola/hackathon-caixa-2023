import dotenv from 'dotenv';
dotenv.config();

import app from "@app/app";

app.listen(process.env.API_LISTEN_PORT, () => {
    console.log(`API listening on port ${process.env.API_LISTEN_PORT}`);
})