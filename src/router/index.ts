import express from 'express'
const router = express.Router();
import authenciation from './authenciation'
export default (): express.Router => {
    authenciation(router)
    return router;
}