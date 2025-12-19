
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Organization } from "../models/organization.model.js";

export const register = async (req, res) => {
    try {
        const { organizationName, email, password } = req.body;

        if (!organizationName || !email || !password) {
            return res.status(400).json({
                message: "Insufficient data",
                success: false,
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const organization = await Organization.create({
            name: organizationName,
            defaultLowStockThreshold: 5,
        });


        await User.create({
            email,
            password: hashedPassword,
            organizationId: organization._id,
        })

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Insufficient data",
                success: false,
            });
        }


        let user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }

        const isHassedMatch = await bcrypt.compare(password, user.password);

        if (!isHassedMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }


        const tokenData = {
            userId: user._id,
            organizationId: user.organizationId,
        }

        //➡️ This creates a payload for the JWT (JSON Web Token).
        //It includes the user's MongoDB _id, which uniquely identifies the user.



        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        const organization = await Organization.findById(user.organizationId);

        const responseUser = {
            id: user._id,
            email: user.email,
            organizationId: user.organizationId,
            organizationName: organization.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        }).json({
            message: `Welcome back`,
            success: true,
            user: responseUser,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfull",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Create an account first.",
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.error("Error fetching user and tasks by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
