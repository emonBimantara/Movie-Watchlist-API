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

export { register }