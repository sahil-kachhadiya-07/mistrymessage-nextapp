'use client'

import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
import { Button } from '../Button'

const NavBar = () => {
    const {data:session} = useSession()

    const user:User =  session?.user as User;
  return (
    
    <nav className='bg-white min-h-[80px] w-full shadow-md flex justify-between items-center px-6'>
            <div  className='font-black h-full text-[40px] '>mystery message</div>
            <div>
            {
                session ? (
                   <>
                    <span>
                      Welcome , {user?.username || user?.email}
                    </span>
                    <Button onClick={()=>signOut()}>Sign Out</Button>
                   </>
                ) : (
                  <Link href="/sign-in">
                    <Button>
                      Login
                    </Button>
                  </Link>
                )
            }
            </div>
    </nav>
  )
}

export default NavBar