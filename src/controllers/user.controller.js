import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) => {
    // get user details from frontend
    // validation -not empty
    // check if user already exists username,email
    // check for images ,avatar
    // upload them to cloudinary,avatar
    // create user object - create entry in db
    //  removce password and refresh token fileld from response
    // check for user creation
    // return res

    const {fullName, email,username,password} = req.body;
    console.log("email:", email);
    
    if(
        [fullName,email,username,password].some((field) => {
            field?.trim() === "" // field is empty OR only contains spaces
        })
    ){
        throw new ApiError(400,"All Fields are Required");
    }

    const existedUser =  User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(400,"User with email or username already exists"); 
    }

    const avatarLocalPath =  req.files?.avatar[0]?.path //you will get the proper path
    const coverImageLOcalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")

    }

    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLOcalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase() 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken  "
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registiring the user")

    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully") 
    )

}) 


export {registerUser}