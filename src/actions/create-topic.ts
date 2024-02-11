"use server";

import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import {z} from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/Path';
const createTopicSchema = z.object({
name:z
    .string()
    .min(3)
    .regex(/^[a-z]+$/,{
    message:'Must be Lowercase letters or no white spaces'
}),
description:z.string().min(10),
})

interface CreateTopicFormState{
    errors:{
        name?:string[]
        description?:string[]
        _form?:string[]
    }
}

export async function createTopic( 
    formState:CreateTopicFormState,
    formData:FormData):Promise<CreateTopicFormState>{
   
  const result = createTopicSchema.safeParse({
      name:formData.get('name'),
      description:formData.get('Description')

   })
   if(!result.success){
         return {
         errors:result.error.flatten().fieldErrors,
     }
    }
    const session = await auth();
    if(!session||!session.user){
        return {
            errors:{
               _form:['You must be signed in to do this'],
            },
        }
    }
   //saving to the database
    let topic:Topic;
    try{
     topic = await db.topic.create({
        data:{
            slug:result.data.name,
            description:result.data.description
        }
      })
      
    }catch(err:unknown){
         if(err instanceof Error){
        return{
           errors:{
            _form:[err.message]
         }
        }
         }else{
            return {
            errors:{
             _form:['Something went Wrong']
            }
        }
         }
    }
    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));
    return{
        errors:{}
     }

    //TODO:revalidate the homepage after creating the homePage
}