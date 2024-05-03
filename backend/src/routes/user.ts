import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// import { Bindings } from 'hono/types';
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@neerajgagat9999/medium-common";
export const userRouter = new Hono<{
    Bindings:{
       DATABASE_URL: string,
       JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json(); 
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are incorrect"
        })
    }
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
   try {
      const user = await prisma.user.create({
          data: {
            password: body.password,
            username: body.username,
            name: body.name
          },
        })
        const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
        return c.text(jwt)
      
   } catch (e) {
      console.log(e)
      c.status(411);
      return c.text("Invalid")
   } 
  })
  
  userRouter.post('/signin', async (c) => {
      const body = await c.req.json()
      const { success } = signinInput.safeParse(body);
        if(!success){
           c.status(411);
            return c.json({
              message: "Inputs are incorrect"
        })
    }
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
      try {
          const user = await prisma.user.findUnique({
              where: {
                  username: body.username,
                  password: body.password
              },
          })
          if (!user) {
              c.status(403);
              return c.json({message:"Incorrect Credentials"});
          }
          const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
          return c.text(jwt)
      } catch (e) {
          console.log(e);
          c.status(411);
          return c.text('Invalid')
      }
  })