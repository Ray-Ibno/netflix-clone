const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Builte by{' '}
          <a
            href="https://github.com/Ray-Ibno"
            target="_blank"
            rel="norefferer"
            className="font-medium underline underine-offset-4"
          >
            Alradenn
          </a>
          . The source code is available on{' '}
          <a
            href="https://github.com/Ray-Ibno/netflix-clone"
            target="_blank"
            rel="norefferer"
            className="font-medium underline underine-offset-4"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  )
}
export default Footer
