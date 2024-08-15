import { Thought } from "../../models/Thought.js";
import { User } from "../../models/User.js"
import { responseError, responseNotFound, responseUserError } from "../errorhandlers.js";

export const createUser = async(req, res) => {
    if (!req.body){ responseUserError(res, "No body provided"); return }

    let { username, email, thoughts, friends } = req.body;
    try{
        const u = await User.create({
            username, email, thoughts, friends
        });
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const getUsers = async(req, res) => {
    try{
        let u = await User.find();
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const getOneUser = async(req, res) => {
    try{
        let u = await User.findOne({_id :req.params.id}, {strictPopulate: false})
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
        !u ? responseNotFound(res, req.params.id) :
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const deleteUser = async(req, res) => {
    try{
        let u = await User.findByIdAndDelete({_id : req.params.id});
        if(!u){ responseNotFound(res, req.params.id); return}
        let t = await Thought.deleteMany({username: u.username})
        res.status(200).json(u);
        
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const updateUser = async(req, res) => {
    if (!req.body){ responseUserError(res, "No body provided"); return }

    try{
        let u = await User.findByIdAndUpdate(req.params.id, 
            { $set: req.body },
            { runValidators: true, new: true });
        !u ? responseNotFound(res, req.params.id) :
        res.status(200).json(u);
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const addFriend = async(req, res) => {
    try{
        const u = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true }
        );
        res.status(200).json({});
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}

export const deleteFriend = async(req, res) => {
    try{
        const u = await User.findOneAndUpdate(
            {_id: req.params.id},
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.status(200).json({});
    }catch(err){
        console.error(err);
        responseError(res, err.message || err);
    }
}