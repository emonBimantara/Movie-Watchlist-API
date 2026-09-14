import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"

const register = async (req, res) => {
    const { name, email, password } = req.body

    // User already exist?
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExist) {
        return res
            .status(400)
            .json({ error: "User already exist with this email" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            }
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    // Check if user email exist in the table
    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        return res
            .status(401)
            .json({ error: "Invalid Email" })
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res
            .status(401)
            .json({ error: "Invalid Password" })
    }

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            }
        }
    })
}

export { register, login }