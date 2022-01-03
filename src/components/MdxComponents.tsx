import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Code from '@/components/Code';

export const components = {
  Image,
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <a
          {...props}
          className='text-fore-subtle underline hover:text-accent focus-visible:outline-accent focus-visible:text-accent'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        />
      );
    }

    if (href.startsWith('#')) {
      return (
        <a
          {...props}
          href={href}
          className='duration-75 ease-out ml-1 opacity-0 origin-left scale-0 text-fore-subtle transform transition-transform group-hover:opacity-100 group-hover:scale-100 hover:text-accent focus-visible:outline-accent focus-visible:text-accent'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z'
              clipRule='evenodd'
            />
          </svg>
        </a>
      );
    }

    return (
      <Link href={href}>
        <a
          {...props}
          className='text-fore-subtle underline hover:text-accent focus-visible:outline-accent focus-visible:text-accent'
        />
      </Link>
    );
  },
  strong: ({ ...props }) => <strong {...props} className='font-semibold' />,
  h2: ({ ...props }) => {
    return (
      <h2
        {...props}
        data-heading
        className='flex font-bold group items-baseline leading-10 mb-8 mt-14 text-2xl text-accent lg:text-3xl'
      />
    );
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className='flex font-bold group items-baseline leading-tight mb-4 mt-14 text-2xl text-accent'
      />
    );
  },
  p: ({ ...props }) => {
    return <p {...props} className='leading-7 my-6 lg:leading-8' />;
  },
  code: ({ children, showLineNumbers, fileName, id }) => {
    return (
      <React.Fragment>
        <Code
          className={classNames('', {
            'line-numbers': showLineNumbers !== undefined,
          })}
          id={id}
        >
          {fileName && <div className='code-filename w-full'>{fileName}</div>}
          {children}
        </Code>
      </React.Fragment>
    );
  },
  em: ({ ...props }) => {
    return <em {...props} className='italic' />;
  },
  hr: ({ ...props }) => {
    return <hr {...props} className='border-accent my-10' />;
  },
  blockquote: ({ ...props }) => {
    return (
      <blockquote
        {...props}
        className='bg-back-secondary border-accent border-l-2 my-6 px-5 py-2 text-base lg:-ml-6'
      />
    );
  },
  ul: (props: any) => (
    <ul className='leading-relaxed list-disc list-inside mb-4' {...props} />
  ),
  ol: (props: any) => (
    <ol className='leading-7 list-decimal my-6 pl-4' {...props} />
  ),
  li: (props: any) => <li className='mt-3' {...props} />,
  CodeLink: ({ id, index, href, children, ...props }) => {
    const isExternal = href.startsWith('http');
    React.useEffect(() => {
      const codeblock = document.getElementById(id);
      if (!codeblock) return;

      const allHighlightWords = codeblock.querySelectorAll('.highlight-word');
      const target = allHighlightWords[index - 1];
      if (!target) return;

      target.replaceWith(
        Object.assign(document.createElement('a'), {
          href,
          innerHTML: target.innerHTML,
          className: target.className,
          ...(isExternal ? { target: '_blank', rel: 'noopener' } : {}),
        })
      );
    }, []);

    return null;
  },
};
