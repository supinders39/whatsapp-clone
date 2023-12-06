import getPrismaInstance from "../utils/PrismaClient.js"
export const checkUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ msg: "Email is required", status: false });
        }
        const prisma = await getPrismaInstance();

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.json({ msg: "User not found", status: false });
        } else {
            return res.json({ msg: "User found", status: true, data: user });
        }
    } catch (error) {
        console.log("🚀 ~ file: AuthController.js:5 ~ checkUser ~ error:", error)

    }
}

export const onBoardUser = async (req, res, next) => {
    try {
        const { email, name, about, image: profilePicture } = req.body;
        if (!email || !name  || !profilePicture) {
            return res.send("Email, name and image must be provided")
        }
        const prisma = getPrismaInstance()
        await prisma.user.create({
            data: { email: email, name, about, profilePicture}
        })
        return res.json({msg: "success", status: true})
    } catch (error) {
            next(error);
    }
}