import Image from 'next/image'
import * as React from 'react';

import { Blob } from '@/components/Atoms'
import Next from '@/components/Next';
import Seo from '@/components/Seo';

import avatar from '../../public/images/the-avatar.png'


export default function HomePage() {
  return (
    <div className="flex flex-col-reverse items-center mt-12 lg:flex-row lg:justify-between lg:space-x-6">
      <Seo />
      <div className="flex flex-col">
      <p className="max-w-3xl mt-12 text-3xl font-semibold lg:mt-0 sm:text-4xl sm:text-left md:text-center lg:text-left">
        Hi, I’m Jerry. I’m a react developer.
      </p>
      <div className="px-4 py-8 w-full sm:w-3/4">
        <Next />
      </div>
      </div>
   
    <div className="relative">
      <Blob />
      <div className="absolute top-0 flex items-center justify-center w-full h-full">
        <div className="w-32 h-32 overflow-hidden rounded-full md:h-40 md:w-40 lg:h-48 lg:w-48">
          <Image
            src={avatar}
            alt="My avatar"
            width={256}
            height={256}
            quality={100}
            priority={true}
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  </div>
  );
}
