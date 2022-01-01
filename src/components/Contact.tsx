import { Button,ExtLink } from './Atoms'

export function Contact() {
  
  return (
    <div className="mt-32 full-width-container bg-back-secondary">
      <div className="container max-w-screen-xl pt-16 mx-auto">
        <h1 className="text-3xl font-semibold text-center">
          Get in touch{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="px-4 mt-4 text-center text-fore-secondary">
          Feel free to email me about anything. Do you have some feedback or
          suggestions?
        </p>
        <p className="px-4 mt-1 text-center text-fore-secondary">
          You can also reach me around the web:{' '}
          <ExtLink link="https://github.com/c1495616js">GitHub</ExtLink>,{' '}
          <ExtLink link="https://twitter.com/c1495616">Twitter</ExtLink>
        </p>
        <div className="flex justify-center pt-10 pb-2 mx-auto">
          <Button
            link="mailto:c1495616@gmai.com"
          
          >
            <span className="text-2xl font-semibold text-back-secondary">
              Say hello
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
