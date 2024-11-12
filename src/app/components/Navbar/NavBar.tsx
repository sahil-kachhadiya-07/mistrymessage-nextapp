'use client'

import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
import { Button } from '../Button'
import Image from 'next/image'
import { Icon } from '../../../../public/assets'

const NavBar = () => {
    const {data:session} = useSession()

    const user:User =  session?.user as User;
  return (
    
    <nav className='bg-white min-h-[80px] w-full !shadow-lg z-30 flex justify-between items-center px-6'>
            {/* <div  className='font-black h-full text-[40px] text-white'>mystery message</div> */}
            <Image src={Icon} alt='icon' width={40} height={40}/>
            <div>
            {
                session ? (
                   <>
                    <span>
                      Welcome , {user?.username || user?.email}
                    </span>
                    <Button onClick={()=>signOut()} >Sign Out</Button>
                   </>
                ) : (
                  <Link href="/sign-in">
                    <Button className='!bg-pink-400'>
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