import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt"
import { createBlogInput,updateBlogInput} from "@sandeep2401/comman";

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		SECRET_KEY: string,
	},
  Variables : {
		userId: string
	}
}>();

blogRouter.use('/*', async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.text("OK");
  }

  await next();
});

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) return c.json({ error: "Authorization header missing" }, 401);

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return c.json({ error: "Invalid auth format" }, 401);
  const token = parts[1];

  const response = (await verify(token, c.env.SECRET_KEY)) as { id?: string };

  if (!response.id) return c.json({ error: "unauthorized" }, 403);
  c.set("userId", response.id);

  await next();
});


blogRouter.post('/', async (c) =>{
  try{  
    const userId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body);
        if(!success) {
          c.json({
            msg : "invalid input type"
          },411)
        }
    const post = await prisma.post.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : userId
      }
    })

    return c.json({
      msg:"post has been added successfully",
      postId : post.id,
      authorId : userId
    })
  }
  catch(e : any){
    return c.json({
      msg : "error adding the post",
      err : e.message
    })
  }
})

blogRouter.put('/', async(c) =>{
  try{  
    const userId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const {success} = updateBlogInput.safeParse(body);
        if(!success) {
          c.json({
            msg : "invalid input type"
          },411)
        }

    const updateData: any = {}
    if (body.title) updateData.title = body.title
    if (body.content) updateData.content = body.content

    const post = await prisma.post.update({
      where : {
        id : body.id,
        authorId : userId
      },
      data : updateData
    })

    return c.json({
      msg : "post has been updated successfully",
      postId : post.id,
      authorId : userId
    })
  }
  catch(e : any){
    return c.json({
      msg : "error updating the post",
      err : e.message
    })
  }
})

blogRouter.get('/bulk', async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL
  }).$extends(withAccelerate())

  try{  
    const posts = await prisma.post.findMany({})
    return c.json(posts)
  }
  catch(e:any){
    c.json({
      msg : "error fetching blogs",
      err : e.message
    })
  }
})  

blogRouter.get('/:id', async(c) =>{
  try{
    const id = c.req.param('id');

    const prisma = new PrismaClient({
      datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.findUnique({
      where : {
        id
      },
      include : {
        author : {
          select : {
            name : true,
          },
        },
      },
    })
    if(!post) return c.json({msg : `unable to find a post with the id ${id}`})

    return c.json(post)
  }
  catch(e : any){
    return c.json({
      msg : "error fetching the post",
      err : e.message
    })
  }
})


export default blogRouter