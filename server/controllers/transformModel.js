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

export const createPosition = async (req, res) => {
    const position = req.body;

    const newPositionMessage = new PostMessage({ ...position, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPositionMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePosition = async (req, res) => {
    const { id } = req.params;
    const { Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No position with id: ${id}`);

    const updatedPosition = { Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPosition, { new: true });

    res.json(updatedPost);
}