import express from 'express';
import mongoose from 'mongoose';

import TransformPosition from '../models/transformModel.js';

const router = express.Router();

export const getPositions = async (req, res) => { 
    try {
        const transformPos = await TransformPosition.find();
                
        res.status(200).json(transformPos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosition = async (req, res) => { 
    const { id } = req.params;

    try {
        const pos = await TransformPosition.findById(id);
        
        res.status(200).json(pos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}