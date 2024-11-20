'use client'

import { Button } from '@/app/components/Button';
import { Container } from '@/app/components/Container';
import { User } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponseType';
import axios, { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PublicUrl = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const [text, setText] = useState<string>('');
  const { username } = useParams();
  const router = useRouter(); // Hook to programmatically navigate

  console.log('params', username);

  const checkUserExist = async (username:any) => {
    try {
      const response = await axios.get(`/api/check-public-username/${username}`);
      toast(response.data.message || 'User exists');
      console.log('response', response);
    } catch (error) {
      console.error('User Not Found', error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError?.response?.data?.message || error.message || 'Error checking user';
      toast(errorMessage);
      
      // If user does not exist, redirect to sign-up page
      if (axiosError?.response?.status === 404) {
        router.push('/sign-up'); // Redirect to the sign-up page
      }
    }
  };
console.log('username', username)
  useEffect(() => {
    if (username) {
      checkUserExist(username);
    } else {
      console.log('Invalid params or username not found');
    }
  }, [username]);

  const handleTextArea = async () => {
    if (!text.trim()) {
      toast('Message cannot be empty');
      return;
    }
    try {
      const response = await axios.post('/api/send-message', {
        username: user.username,
        content: text
      });
      toast(response.data.message);
    } catch (error) {
      console.error('Error in send message', error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast(axiosError.response?.data.message || 'Error in send message');
    }
  };

  return (
    <Container>
      <h1 className='flex items-center justify-center text-4xl font-bold pb-8'>
        Public Profile Url
      </h1>
      <textarea
        placeholder='Drop your message...'
        rows={3}
        onChange={(e) => setText(e.target.value)}
        className='border border-solid shadow-sm p-1 w-full rounded'
      />
      <Button onClick={handleTextArea} className='!w-[100px]'>
        Send it...
      </Button>
    </Container>
  );
};

export default PublicUrl;
