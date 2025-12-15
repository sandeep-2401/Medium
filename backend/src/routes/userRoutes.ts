import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput,signinInput,createBlogInput,updateBlogInput} from "@sandeep2401/comman";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    }
}>();

userRouter.use('/*', async (c, next) => {
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight request
    if (c.req.method === "OPTIONS") {
        return c.text("OK");
    }

    await next();
});


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
      return c.json({
        msg : "invalid input type"
      },411)
    }
    const user = await prisma.user.create({
      data: {
        name : body.name,
        email: body.email,
        password: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.SECRET_KEY)
  
    return c.json({
      jwt: token,
      userId: user.id,
    })
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} =signinInput.safeParse(body);
    if(!success) {
      return c.json({
        msg : "invalid input type"
      },411)
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ 
      jwt,
      userId: user.id,
     });
})
