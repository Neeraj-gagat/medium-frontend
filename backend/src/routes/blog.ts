import { CreateBlogInput, createBlogInput, updateBlogInput } from "@neerajgagat9999/medium-common"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
	    JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>();
 
blogRouter.use('/*', async(c,next) =>{
    	// // get the headder 
    	// // verify the header 
    	// // if header is correct we can proceed 
    	// // if not then we need to return user as 403 status code 
    	const autHeader = c.req.header("authorization") || "";

        try {
            const user = await verify(autHeader, c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "you are not logged in"
            })
        }
        } catch (e) {
            c.status(403);
            return c.json({
                message: "you are not logged in"
            })
        }
     
    });

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are incorrect"
        })
    }
    const authorId = c.get("userId")   
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.create({
    data:{
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
    }
  })
	return c.json({
        id: blog.id
    })
})

blogRouter.put('/',async (c) => {
    const body = await c.req.json();  
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are incorrect"
        })
    } 
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.update({
    where:{
        id: body.id
    },
    data:{
        title: body.title,
        content: body.content
    }
  })
    return c.json({
        id: blog.id
})
})


blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const blog = await prisma.blog.findMany({
        select: {
            content: true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
	return c.json({
        blog
    })
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id')
	// console.log(id);  
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   try {
    const blog = await prisma.blog.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
      })
      return c.json({
        blog
    })
    } catch (e) {
        c.status(411)
        return c.json({
            message: "error while fetching blog post"
        });
   }
})

