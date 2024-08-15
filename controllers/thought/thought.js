import { Thought } from "../../models/Thought.js";
import { User } from "../../models/User.js";
import { responseError, responseNotFound, responseUserError } from "../errorhandlers.js";

export const createThought = async(req, res) => {
    if (!req.body){ responseUserError(res, "No body provided"); return }

    let { thoughtText, username, reactions, userId} = req.body;
    if(!userId){ responseUserError(res, "Required 'userId' not provided"); return }
    try{
        
        const t = await Thought.create({
            thoughtText, username, reactions
        })
        const u = await User.findOneAndUpdate({_id: userId}, 
            {$addToSet: {thoughts: t._id}},
            { runValidators: true, new: true })
        res.status(200).json(t);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const getThoughts = async(req, res) => {
    try{
        let u = await Thought.find();
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const getOneThought = async(req, res) => {
    try{
        let u = await Thought.findOne({_id :req.params.id}).select('-__v');
        !u ? responseNotFound(res, req.params.id) :
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const deleteThought = async(req, res) => {
    try{
        let u = await Thought.findByIdAndDelete(req.params.id);
        !u ? responseNotFound(res, req.params.id) :
        res.status(200).json(u);
        
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const updateThought = async(req, res) => {
    if (!req.body){responseUserError(res, "No body provided"); return }

    try{
        let u = await Thought.findByIdAndUpdate(req.params.id, 
            { $set: req.body },
            { runValidators: true, new: true });
        !u ? responseNotFound(res, req.params.id) :
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const addReaction = async(req, res) => {
    if (!req.body){ responseUserError(res, "No body provided"); return }

    try{
        const u = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {reactions: req.body}},
            { runValidators: true, new: true }
        );
        res.status(200).json({});
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const deleteReaction = async(req, res) => {
    if (!req.body){ responseUserError(res, "No body provided"); return }

    try{
        const u = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            { $pull: { reactions: req.body.reactionId } },
            { runValidators: true, new: true }
        );
        res.status(200).json({});
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}